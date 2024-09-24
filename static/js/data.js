let defaultItems = [
    {
        "id": "var-001",
        "name": "Main Trading Strategy",
        "type": "container",
        "subtype": "variable",
        "variableType": "integer",
        "initialValue": 3,
        "value": 3,
        "message": "Risk level from 1 (low) to 5 (high)",
        "active": true,
    },
    {
        "id": "var-002",
        "name": "Maximum Open Positions",
        "type": "container",
        "subtype": "variable",
        "variableType": "integer",
        "initialValue": 5,
        "value": 5,
        "message": "Maximum number of open positions allowed",
        "active": true,
    },
    {
        "id": "var-003",
        "name": "Daily Loss Limit",
        "type": "container",
        "subtype": "variable",
        "variableType": "float",
        "initialValue": 2.5,
        "value": 2.5,
        "message": "Maximum daily loss allowed (in %)",
        "active": true,
    },
    {
        "id": "var-004",
        "name": "Volatility Threshold",
        "type": "container",
        "subtype": "variable",
        "variableType": "float",
        "initialValue": 2.0,
        "value": 2.0,
        "message": "Minimum volatility required for trading (in %)",
        "active": true,
    },
    {
        "id": "var-005",
        "name": "Trend Strength",
        "type": "container",
        "subtype": "variable",
        "variableType": "integer",
        "initialValue": 50,
        "value": 50,
        "message": "Minimum ADX value to confirm trend strength",
        "active": true,
    },
    {
        "id": "msg-001",
        "type": "container",
        "subtype": "message",
        "message": "This trading bot uses a combination of technical indicators and market conditions to make trading decisions.",
        "active": true,
    },
    {
        "id": "msg-002",
        "type": "container",
        "subtype": "message",
        "message": "Always monitor your bot's performance and adjust parameters as needed.",
        "active": true,
    },
    {
        "id": "gui-001",
        "type": "container",
        "subtype": "group",
        "title": "Main Trading Strategy",
        "backgroundColor": "cornflowerblue",
        "textColor": "black",
        "highlight": "red",
        "showChildren": true,
        "active": true,
        "conditions": [],
        "actions": [],
        "children": [
            {
                "id": "gui-002",
                "type": "container",
                "subtype": "group",
                "title": "Risk Management",
                "backgroundColor": "lightgreen",
                "textColor": "black",
                "highlight": "blue",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [
                    {
                        "id": "act-001",
                        "type": "action",
                        "title": "Daily Loss Check",
                        "message": "If daily loss exceeds {params[0]}%, stop trading for the day",
                        "active": true,
                        "params": [
                            { "value": "2.5", "text": "2.5%", "color": "red", "type": "percentage", "unit": "%" }
                        ],
                        "template": "dailyLossCheck"
                    },
                    {
                        "id": "act-002",
                        "type": "action",
                        "title": "Volatility Check",
                        "message": "If {params[0]} volatility is below {params[1]}%, skip trading",
                        "active": true,
                        "params": [
                            { "value": "market", "text": "Market", "color": "yellow", "type": "context", "unit": "" },
                            { "value": "2.0", "text": "2.0%", "color": "white", "type": "percentage", "unit": "%" }
                        ],
                        "template": "volatilityCheck"
                    }
                ],
                "children": []
            },
            {
                "id": "gui-003",
                "type": "container",
                "subtype": "group",
                "title": "Market Analysis",
                "backgroundColor": "lightyellow",
                "textColor": "black",
                "highlight": "orange",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "var-006",
                        "name": "Market Sentiment",
                        "type": "container",
                        "subtype": "variable",
                        "variableType": "string",
                        "initialValue": "neutral",
                        "value": "neutral",
                        "message": "Current market sentiment (bullish, bearish, or neutral)",
                        "active": true,
                    },
                    {
                        "id": "msg-003",
                        "type": "container",
                        "subtype": "message",
                        "message": "Market sentiment is determined by analyzing various indicators and news sources.",
                        "active": true,
                    },
                    {
                        "id": "gui-004",
                        "type": "container",
                        "subtype": "if",
                        "title": "Sentiment Analysis",
                        "highlight": "purple",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-001",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "if",
                                "message": "RSI(14) on {params[0]} is {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "70", "text": "70", "color": "white", "type": "indicatorValue", "unit": "" },
                                    { "value": "1d", "text": "1 day", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-002",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "MACD on {params[0]} shows bullish crossover on {params[1]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-003",
                                "type": "action",
                                "title": "action",
                                "message": "Set Market Sentiment to {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "bullish", "text": "Bullish", "color": "green", "type": "sentiment", "unit": "" }
                                ],
                                "template": "setMarketSentiment"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "gui-005",
                "type": "container",
                "subtype": "group",
                "title": "BTC Trading Strategy",
                "backgroundColor": "orange",
                "textColor": "black",
                "highlight": "red",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "var-007",
                        "name": "BTC Position Size",
                        "type": "container",
                        "subtype": "variable",
                        "variableType": "float",
                        "initialValue": 0.1,
                        "value": 0.1,
                        "message": "Position size for BTC trades (in BTC)",
                        "active": true,
                    },
                    {
                        "id": "msg-004",
                        "type": "container",
                        "subtype": "message",
                        "message": "BTC trading strategy uses a combination of trend following and mean reversion techniques.",
                        "active": true,
                    },
                    {
                        "id": "gui-006",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Entry Condition",
                        "highlight": "blue",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-003",
                                "type": "condition",
                                "subtype": "priceConditionWithCandlestick",
                                "title": "if",
                                "message": "{params[0]} {params[1]} {params[2]}{params[3]} of the {params[4]} within the last {params[5]} candlesticks",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "high", "text": "Highest price", "color": "aqua", "type": "candlePrice", "unit": "" },
                                    { "value": "", "text": "", "color": "white", "type": "addition", "unit": "" },
                                    { "value": "4h", "text": "4 hour timeframe", "color": "aqua", "type": "timeframe", "unit": "" },
                                    { "value": "20", "text": "20", "color": "white", "type": "candle", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-004",
                                "type": "condition",
                                "subtype": "volumeCondition",
                                "title": "and",
                                "message": "{params[0]} volume is {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "1000000", "text": "1,000,000", "color": "white", "type": "volume", "unit": "$" },
                                    { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-005",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "Bollinger Bands on {params[0]} show price touching upper band on {params[1]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-006",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "Stochastic Oscillator on {params[0]} shows overbought condition on {params[1]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-004",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                "active": true,
                                "params": [
                                    { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "0.1", "text": "0.1", "color": "white", "type": "amount", "unit": "BTC" },
                                    { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" }
                                ],
                                "template": "placeOrder"
                            },
                            {
                                "id": "act-005",
                                "type": "action",
                                "title": "action",
                                "message": "Place stop loss order for {params[0]} at {params[1]}% below entry",
                                "active": true,
                                "params": [
                                        { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "2.5", "text": "2.5", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "placeStopLoss"
                            },
                            {
                                "id": "act-006",
                                "type": "action",
                                "title": "action",
                                "message": "Place trailing stop for {params[0]} at {params[1]}% below current price",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1.5", "text": "1.5", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "placeTrailingStop"
                            }
                        ],
                        "children": []
                    },
                    {
                        "id": "gui-007",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Exit Condition",
                        "highlight": "red",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-007",
                                "type": "condition",
                                "subtype": "profitCondition",
                                "title": "if",
                                "message": "Profit on {params[0]} position is {params[1]} {params[2]}",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "5", "text": "5", "color": "white", "type": "percentage", "unit": "%" }
                                ]
                            },
                            {
                                "id": "cond-008",
                                "type": "condition",
                                "subtype": "timeCondition",
                                "title": "or",
                                "message": "Position has been open for more than {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "24h", "text": "24 hours", "color": "aqua", "type": "duration", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-009",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "or",
                                "message": "RSI(14) on {params[0]} crosses below {params[1]} on {params[2]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "70", "text": "70", "color": "white", "type": "indicatorValue", "unit": "" },
                                    { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-007",
                                "type": "action",
                                "title": "action",
                                "message": "Close {params[0]} position for {params[1]}",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "100", "text": "100%", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "closePosition"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "gui-008",
                "type": "container",
                "subtype": "group",
                "title": "ETH Trading Strategy",
                "backgroundColor": "purple",
                "textColor": "white",
                "highlight": "black",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "var-008",
                        "name": "ETH Position Size",
                        "type": "container",
                        "subtype": "variable",
                        "variableType": "float",
                        "initialValue": 1.0,
                        "value": 1.0,
                        "message": "Position size for ETH trades (in ETH)",
                        "active": true,
                    },
                    {
                        "id": "msg-005",
                        "type": "container",
                        "subtype": "message",
                        "message": "ETH trading strategy focuses on momentum and breakout patterns.",
                        "active": true,
                    },
                    {
                        "id": "gui-009",
                        "type": "container",
                        "subtype": "if",
                        "title": "ETH Entry Condition",
                        "highlight": "green",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-010",
                                "type": "condition",
                                "subtype": "movingAverageCondition",
                                "title": "if",
                                "message": "{params[0]} {params[1]} crosses above {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "MA20", "text": "20-period MA", "color": "aqua", "type": "indicator", "unit": "" },
                                    { "value": "MA50", "text": "50-period MA", "color": "pink", "type": "indicator", "unit": "" },
                                    { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-011",
                                "type": "condition",
                                "subtype": "volumeCondition",
                                "title": "and",
                                "message": "{params[0]} volume is {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "500000", "text": "500,000", "color": "white", "type": "volume", "unit": "$" },
                                    { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-012",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "ADX(14) on {params[0]} is {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "25", "text": "25", "color": "white", "type": "indicatorValue", "unit": "" },
                                    { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-008",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                "active": true,
                                "params": [
                                    { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1.0", "text": "1.0", "color": "white", "type": "amount", "unit": "ETH" },
                                    { "value": "2", "text": "2x", "color": "orange", "type": "leverage", "unit": "x" }
                                ],
                                "template": "placeOrder"
                            },
                            {
                                "id": "act-009",
                                "type": "action",
                                "title": "action",
                                "message": "Place stop loss order for {params[0]} at {params[1]}% below entry",
                                "active": true,
                                "params": [
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "3.0", "text": "3.0", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "placeStopLoss"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "gui-010",
                "type": "container",
                "subtype": "group",
                "title": "Altcoin Basket Strategy",
                "backgroundColor": "lightblue",
                "textColor": "black",
                "highlight": "darkblue",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "var-009",
                        "name": "Altcoin Basket Size",
                        "type": "container",
                        "subtype": "variable",
                        "variableType": "integer",
                        "initialValue": 5,
                        "value": 5,
                        "message": "Number of altcoins in the basket",
                        "active": true,
                    },
                    {
                        "id": "msg-006",
                        "type": "container",
                        "subtype": "message",
                        "message": "Altcoin basket strategy aims to diversify risk across multiple promising altcoins.",
                        "active": true,
                    },
                    {
                        "id": "gui-011",
                        "type": "container",
                        "subtype": "if",
                        "title": "Altcoin Selection Condition",
                        "highlight": "yellow",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-013",
                                "type": "condition",
                                "subtype": "marketCapCondition",
                                "title": "if",
                                "message": "{params[0]} market cap rank is between {params[1]} and {params[2]}",
                                "active": true,
                                "params": [
                                    { "value": "altcoin", "text": "Altcoin", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "10", "text": "10", "color": "white", "type": "rank", "unit": "" },
                                    { "value": "50", "text": "50", "color": "white", "type": "rank", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-014",
                                "type": "condition",
                                "subtype": "volumeCondition",
                                "title": "and",
                                "message": "{params[0]} 24h volume is {params[1]} {params[2]}",
                                "active": true,
                                "params": [
                                    { "value": "altcoin", "text": "Altcoin", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "100000000", "text": "100,000,000", "color": "white", "type": "volume", "unit": "$" }
                                ]
                            },
                            {
                                "id": "cond-015",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "RSI(14) on {params[0]} is {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "altcoin", "text": "Altcoin", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "lt", "text": "Less than", "color": "red", "type": "operator", "unit": "" },
                                    { "value": "40", "text": "40", "color": "white", "type": "indicatorValue", "unit": "" },
                                    { "value": "1d", "text": "1 day", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-010",
                                "type": "action",
                                "title": "action",
                                "message": "Add {params[0]} to altcoin basket",
                                "active": true,
                                "params": [
                                { "value": "altcoin", "text": "Altcoin", "color": "yellow", "type": "symbol", "unit": "" }
                                ],
                                "template": "addToAltcoinBasket"
                            }
                        ],
                        "children": []
                    },
                    {
                        "id": "gui-012",
                        "type": "container",
                        "subtype": "if",
                        "title": "Altcoin Basket Entry Condition",
                        "highlight": "green",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-016",
                                "type": "condition",
                                "subtype": "marketTrendCondition",
                                "title": "if",
                                "message": "Overall market trend is {params[0]} based on {params[1]} index",
                                "active": true,
                                "params": [
                                    { "value": "bullish", "text": "Bullish", "color": "green", "type": "trend", "unit": "" },
                                    { "value": "crypto_fear_greed", "text": "Crypto Fear & Greed", "color": "yellow", "type": "index", "unit": "" }
                                ]
                            },
                            {
                                "id": "cond-017",
                                "type": "condition",
                                "subtype": "portfolioCondition",
                                "title": "and",
                                "message": "Current portfolio allocation to altcoins is {params[0]} {params[1]}%",
                                "active": true,
                                "params": [
                                    { "value": "lt", "text": "Less than", "color": "red", "type": "operator", "unit": "" },
                                    { "value": "20", "text": "20", "color": "white", "type": "percentage", "unit": "%" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-011",
                                "type": "action",
                                "title": "action",
                                "message": "Invest {params[0]}% of available funds equally across altcoin basket",
                                "active": true,
                                "params": [
                                    { "value": "5", "text": "5", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "investInAltcoinBasket"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "gui-013",
                "type": "container",
                "subtype": "group",
                "title": "Portfolio Management",
                "backgroundColor": "lightprimary",
                "textColor": "black",
                "highlight": "darkprimary",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "var-010",
                        "name": "Rebalancing Threshold",
                        "type": "container",
                        "subtype": "variable",
                        "variableType": "float",
                        "initialValue": 5.0,
                        "value": 5.0,
                        "message": "Percentage deviation to trigger rebalancing",
                        "active": true,
                    },
                    {
                        "id": "msg-007",
                        "type": "container",
                        "subtype": "message",
                        "message": "Portfolio management ensures proper asset allocation and risk management.",
                        "active": true,
                    },
                    {
                        "id": "gui-014",
                        "type": "container",
                        "subtype": "if",
                        "title": "Portfolio Rebalancing Condition",
                        "highlight": "blue",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-018",
                                "type": "condition",
                                "subtype": "portfolioAllocationCondition",
                                "title": "if",
                                "message": "Any asset allocation deviates by more than {params[0]}% from target",
                                "active": true,
                                "params": [
                                    { "value": "5.0", "text": "5.0", "color": "white", "type": "percentage", "unit": "%" }
                                ]
                            },
                            {
                                "id": "cond-019",
                                "type": "condition",
                                "subtype": "timeCondition",
                                "title": "and",
                                "message": "Last rebalancing was more than {params[0]} ago",
                                "active": true,
                                "params": [
                                    { "value": "7d", "text": "7 days", "color": "aqua", "type": "duration", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-012",
                                "type": "action",
                                "title": "action",
                                "message": "Rebalance portfolio to target allocations",
                                "active": true,
                                "params": [],
                                "template": "rebalancePortfolio"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "gui-015",
                "type": "container",
                "subtype": "group",
                "title": "Performance Reporting",
                "backgroundColor": "lightyellow",
                "textColor": "black",
                "highlight": "gold",
                "showChildren": true,
                "active": true,
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "var-011",
                        "name": "Reporting Frequency",
                        "type": "container",
                        "subtype": "variable",
                        "variableType": "string",
                        "initialValue": "daily",
                        "value": "daily",
                        "message": "Frequency of performance reports (daily, weekly, monthly)",
                        "active": true,
                    },
                    {
                        "id": "msg-008",
                        "type": "container",
                        "subtype": "message",
                        "message": "Regular performance reporting helps in strategy evaluation and improvement.",
                        "active": true,
                    },
                    {
                        "id": "gui-016",
                        "type": "container",
                        "subtype": "if",
                        "title": "Generate Performance Report",
                        "highlight": "orange",
                        "showChildren": true,
                        "active": true,
                        "conditions": [
                            {
                                "id": "cond-020",
                                "type": "condition",
                                "subtype": "timeCondition",
                                "title": "if",
                                "message": "Current time is {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "00:00", "text": "12:00 AM", "color": "aqua", "type": "time", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "act-013",
                                "type": "action",
                                "title": "action",
                                "message": "Generate and send {params[0]} performance report",
                                "active": true,
                                "params": [
                                    { "value": "daily", "text": "Daily", "color": "white", "type": "reportType", "unit": "" }
                                ],
                                "template": "generatePerformanceReport"
                            }
                        ],
                        "children": []
                    }
                ]
            }
        ]
    },
];

export { defaultItems };