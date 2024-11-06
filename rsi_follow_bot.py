import ccxt
import pandas as pd
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
import mplfinance as mpf

# Initialize Binance exchange
exchange = ccxt.binance({
    'enableRateLimit': True,
    'options': {
        'defaultType': 'future'
    }
})

# Fetch OHLCV data
symbol = 'ETH/USDT'
timeframe = '4h'
limit = 1000

ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=limit)

# Convert to DataFrame
df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
df.set_index('timestamp', inplace=True)

# Calculate RSI
def calculate_rsi(data, length=7):
    delta = data.diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    
    avg_gain = gain.rolling(window=length).mean()
    avg_loss = loss.rolling(window=length).mean()
    
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

df['rsi'] = calculate_rsi(df['close'], length=7)

# Detect crossovers, crossunders, and entry points
oversold = 32
overbought = 68

crossover_points = []
crossunder_points = []
entry_long_points = []
entry_short_points = []
exit_long_points = []
exit_short_points = []

current_position = None
pending_entry = None
pending_exit = None
has_exited = False

for i in range(1, len(df) - 1):  # We need to look ahead one candle, so we stop at len(df) - 1
    prev_rsi = df['rsi'].iloc[i-1]
    curr_rsi = df['rsi'].iloc[i]
    
    if prev_rsi < oversold and curr_rsi > oversold:
        print(f"Crossover (Oversold to Normal) at candle {i+1}, price: {df['close'].iloc[i]}, timestamp: {df.index[i]}")
        crossover_points.append((df.index[i], df['close'].iloc[i]))
        
        if current_position is None and not has_exited:
            if df['high'].iloc[i+1] > df['high'].iloc[i]:
                entry_price = df['high'].iloc[i]
                print(f"Long Entry at candle {i+2}, price: {entry_price}, timestamp: {df.index[i+1]}")
                entry_long_points.append((df.index[i+1], entry_price))
                current_position = 'long'
                has_exited = False
        elif current_position == 'short':
            pending_exit = ('short', max(df['high'].iloc[i], df['high'].iloc[i+1]))
    
    elif prev_rsi > overbought and curr_rsi < overbought:
        print(f"Crossunder (Overbought to Normal) at candle {i+1}, price: {df['close'].iloc[i]}, timestamp: {df.index[i]}")
        crossunder_points.append((df.index[i], df['close'].iloc[i]))
        
        if current_position is None and not has_exited:
            if df['low'].iloc[i+1] < df['low'].iloc[i]:
                entry_price = df['low'].iloc[i]
                print(f"Short Entry at candle {i+2}, price: {entry_price}, timestamp: {df.index[i+1]}")
                entry_short_points.append((df.index[i+1], entry_price))
                current_position = 'short'
                has_exited = False
        elif current_position == 'long':
            pending_exit = ('long', min(df['low'].iloc[i], df['low'].iloc[i+1]))
    
    # Check for exit conditions
    if pending_exit and not has_exited:
        exit_type, exit_price = pending_exit
        if exit_type == 'long' and df['low'].iloc[i] < exit_price:
            print(f"Long Exit at candle {i+1}, price: {exit_price}, timestamp: {df.index[i]}")
            exit_long_points.append((df.index[i], exit_price))
            current_position = None
            pending_exit = None
            has_exited = True
        
        elif exit_type == 'short' and df['high'].iloc[i] > exit_price:
            print(f"Short Exit at candle {i+1}, price: {exit_price}, timestamp: {df.index[i]}")
            exit_short_points.append((df.index[i], exit_price))
            current_position = None
            pending_exit = None
            has_exited = True

# Prepare data for plotting
additional_plots = []

# Create DataFrames for markers
marker_data = {
    'entry_long': {'marker': '>', 'color': 'blue', 'data': entry_long_points, 'label': 'Long Entry'},
    'entry_short': {'marker': '<', 'color': 'purple', 'data': entry_short_points, 'label': 'Short Entry'},
    'exit_long': {'marker': 's', 'color': 'cyan', 'data': exit_long_points, 'label': 'Long Exit'},
    'exit_short': {'marker': 's', 'color': 'magenta', 'data': exit_short_points, 'label': 'Short Exit'}
}

# Prepare annotations
annotations = []

for name, info in marker_data.items():
    if info['data']:
        marker_df = pd.DataFrame(index=df.index)
        for date, value in info['data']:
            if date in marker_df.index:
                marker_df.loc[date, 'value'] = value
                # Prepare annotation
                annotations.append((date, value, f'{info["label"]}\n{value:.2f}'))
        if not marker_df['value'].empty:
            additional_plots.append(
                mpf.make_addplot(marker_df['value'], type='scatter', markersize=100, marker=info['marker'], color=info['color'], label=info['label'])
            )

# RSI and overbought/oversold lines
rsi_plot = mpf.make_addplot(df['rsi'], panel=1, color='g', ylim=(0, 100), label='RSI')
overbought_line = mpf.make_addplot(pd.Series([overbought] * len(df), index=df.index), panel=1, color='r', linestyle='--', label='Overbought/Oversold')
oversold_line = mpf.make_addplot(pd.Series([oversold] * len(df), index=df.index), panel=1, color='r', linestyle='--')

additional_plots.extend([rsi_plot, overbought_line, oversold_line])

# Custom style
mc = mpf.make_marketcolors(up='g', down='r', inherit=True)
s = mpf.make_mpf_style(marketcolors=mc)

# Plot candlestick chart
fig, axes = mpf.plot(df, type='candle', style=s,
         title=f'{symbol} Price, RSI, and Entry/Exit Points',
         ylabel='Price',
         ylabel_lower='RSI',
         volume=True,
         addplot=additional_plots,
         figsize=(15, 10),
         panel_ratios=(2, 1),
         tight_layout=True,
         returnfig=True)

# Add annotations
ax1 = axes[0]
for date, value, text in annotations:
    ax1.annotate(text, (date, value), xytext=(0, 10), 
                 textcoords='offset points', ha='center', va='bottom',
                 bbox=dict(boxstyle='round,pad=0.5', fc='yellow', alpha=0.5),
                 fontsize=8)

# Add legend
handles = []
labels = []
for ap in additional_plots:
    if hasattr(ap, 'label') and ap.label:
        handles.append(plt.Line2D([0], [0], color=ap.color, marker=ap.marker, linestyle='None', markersize=10))
        labels.append(ap.label)
ax1.legend(handles, labels, loc='upper left', bbox_to_anchor=(1.05, 1), borderaxespad=0.)

# Show explanation
explanation = """
Marker Colors:
Blue (>): Long Entry
Purple (<): Short Entry
Cyan (□): Long Exit
Magenta (□): Short Exit

Lines:
Green: RSI
Red Dashed: Overbought/Oversold Levels

Note: After an exit, only new entries will be recorded.
"""
fig.text(0.01, 0.01, explanation, fontsize=8, verticalalignment='bottom')

plt.show()