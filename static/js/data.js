let defaultItems = [
    {
        "id": "SY5ysCajjkeDKG4J0dzE8w",
        "type": "container",
        "subtype": "group",
        "title": "Main Trading Strategy",
        "backgroundColor": "cornflowerblue",
        "textColor": "black",
        "highlight": "red",
        "showChildren": false,
        "active": true,
        "message": "Overall trading strategy for multiple cryptocurrencies",
        "variables": [
            { "id": "globalRiskLevel", "name": "Global Risk Level", "type": "integer", "value": 3, "description": "Risk level from 1 (low) to 5 (high)" },
            { "id": "maxOpenPositions", "name": "Max Open Positions", "type": "integer", "value": 5, "description": "Maximum number of open positions allowed" }
        ],
        "conditions": [],
        "actions": [],
        "children": [
            {
                "id": "BTCTradingGroup",
                "type": "container",
                "subtype": "group",
                "title": "BTC Trading Strategy",
                "backgroundColor": "orange",
                "textColor": "black",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Bitcoin",
                "variables": [
                    { "id": "BTCStopLoss", "name": "BTC Stop Loss %", "type": "float", "value": 2.5, "description": "Stop loss percentage for BTC trades" },
                    { "id": "BTCTakeProfit", "name": "BTC Take Profit %", "type": "float", "value": 5.0, "description": "Take profit percentage for BTC trades" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "BTCEntryCondition",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Entry Condition",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for entering a BTC trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "BTCPriceCondition",
                                "type": "condition",
                                "subtype": "priceConditionWithCandlestick",
                                "title": "if",
                                "message": "{params[0]} {params[1]} {params[2]}{params[3]} of the {params[4]} within the last {params[5]} candlesticks",
                                "active": false,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "high", "text": "Highest price", "color": "aqua", "type": "candlePrice", "unit": "" },
                                    { "value": "", "text": "", "color": "white", "type": "addition", "unit": "" },
                                    { "value": "4h", "text": "4 hour timeframe", "color": "aqua", "type": "timeframe", "unit": "" },
                                    { "value": "20", "text": "20", "type": "candle", "color": "white", "unit": "" }
                                ]
                            },
                            {
                                "id": "BTCVolumeCondition",
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
                                "id": "BTCRSICondition",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "RSI(14) on {params[0]} {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "lt", "text": "Less than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "30", "text": "30", "color": "white", "type": "indicatorValue", "unit": "" },
                                    { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "BTCLongEntry",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                "active": true,
                                "params": [
                                    { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1000", "text": "1000", "color": "white", "type": "amount", "unit": "$" },
                                    { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" }
                                ],
                                "template": "placeOrder"
                            },
                            {
                                "id": "BTCStopLossOrder",
                                "type": "action",
                                "title": "action",
                                "message": "Place stop loss order for {params[0]} at {params[1]}% below entry",
                                "active": true,
                                "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "2.5", "text": "2.5", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "placeStopLoss"
                            }
                        ],
                        "children": []
                    },
                    {
                        "id": "BTCExitCondition",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Exit Condition",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for exiting a BTC trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "BTCProfitCondition",
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
                                "id": "BTCTimeCondition",
                                "type": "condition",
                                "subtype": "timeCondition",
                                "title": "or",
                                "message": "Position has been open for more than {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "24h", "text": "24 hours", "color": "aqua", "type": "duration", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "BTCClosePosition",
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
                "id": "ETHTradingGroup",
                "type": "container",
                "subtype": "group",
                "title": "ETH Trading Strategy",
                "backgroundColor": "purple",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Ethereum",
                "variables": [
                    { "id": "ETHStopLoss", "name": "ETH Stop Loss %", "type": "float", "value": 3.0, "description": "Stop loss percentage for ETH trades" },
                    { "id": "ETHTakeProfit", "name": "ETH Take Profit %", "type": "float", "value": 6.0, "description": "Take profit percentage for ETH trades" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "ETHEntryCondition",
                        "type": "container",
                        "subtype": "if",
                        "title": "ETH Entry Condition",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for entering an ETH trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "ETHMACondition",
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
                                "id": "ETHVolumeCondition",
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
                            }
                        ],
                        "actions": [
                            {
                                "id": "ETHLongEntry",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                "active": true,
                                "params": [
                                    { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "800", "text": "800", "color": "white", "type": "amount", "unit": "$" },
                                    { "value": "2", "text": "2x", "color": "orange", "type": "leverage", "unit": "x" }
                                ],
                                "template": "placeOrder"
                            },
                            {
                                "id": "ETHStopLossOrder",
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
                "id": "SOLTradingGroup",
                "type": "container",
                "subtype": "group",
                "title": "SOL Trading Strategy",
                "backgroundColor": "green",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Solana",
                "variables": [
                    { "id": "SOLStopLoss", "name": "SOL Stop Loss %", "type": "float", "value": 4.0, "description": "Stop loss percentage for SOL trades" },
                    { "id": "SOLTakeProfit", "name": "SOL Take Profit %", "type": "float", "value": 8.0, "description": "Take profit percentage for SOL trades" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "SOLEntryCondition",
                        "type": "container",
                        "subtype": "if",
                        "title": "SOL Entry Condition",
                        "highlight": "yellow",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for entering a SOL trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "SOLBollingerBandCondition",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "if",
                                "message": "{params[0]} price touches lower Bollinger Band(20,2) on {params[1]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            },
                            {
                                "id": "SOLRSICondition",
                                "type": "condition",
                                "subtype": "indicatorCondition",
                                "title": "and",
                                "message": "RSI(14) on {params[0]} {params[1]} {params[2]} on {params[3]} timeframe",
                                "active": true,
                                "params": [
                                    { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "lt", "text": "Less than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "35", "text": "35", "color": "white", "type": "indicatorValue", "unit": "" },
                                    { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "SOLLongEntry",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                "active": true,
                                "params": [
                                    { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                    { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "500", "text": "500", "color": "white", "type": "amount", "unit": "$" },
                                    { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" }
                                ],
                                "template": "placeOrder"
                            },
                            {
                                "id": "SOLStopLossOrder",
                                "type": "action",
                                "title": "action",
                                "message": "Place stop loss order for {params[0]} at {params[1]}% below entry",
                                "active": true,
                                "params": [
                                    { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "4.0", "text": "4.0", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "placeStopLoss"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "GlobalRiskManagement",
                "type": "container",
                "subtype": "group",
                "title": "Global Risk Management",
                "backgroundColor": "red",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Global risk management rules",
                "variables": [
                    { "id": "maxDailyLoss", "name": "Max Daily Loss", "type": "float", "value": 5.0, "description": "Maximum allowed daily loss percentage" },
                    { "id": "maxWeeklyLoss", "name": "Max Weekly Loss", "type": "float", "value": 15.0, "description": "Maximum allowed weekly loss percentage" }
                ],
                "conditions": [
                    {
                        "id": "DailyLossCheck",
                        "type": "condition",
                        "subtype": "portfolioCondition",
                        "title": "if",
                        "message": "Daily loss percentage {params[0]} {params[1]}",
                        "active": true,
                        "params": [
                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                            { "value": "5", "text": "5%", "color": "white", "type": "percentage", "unit": "%" }
                        ]
                    },
                    {
                        "id": "WeeklyLossCheck",
                        "type": "condition",
                        "subtype": "portfolioCondition",
                        "title": "or",
                        "message": "Weekly loss percentage {params[0]} {params[1]}",
                        "active": true,
                        "params": [
                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                            { "value": "15", "text": "15%", "color": "white", "type": "percentage", "unit": "%" }
                        ]
                    }
                ],
                "actions": [
                    {
                        "id": "CloseAllPositions",
                        "type": "action",
                        "title": "action",
                        "message": "Close all open positions",
                        "active": true,
                        "params": [],
                        "template": "closeAllPositions"
                    },
                    {
                        "id": "DisableTrading",
                        "type": "action",
                        "title": "action",
                        "message": "Disable trading for {params[0]}",
                        "active": true,
                        "params": [
                            { "value": "24h", "text": "24 hours", "color": "aqua", "type": "duration", "unit": "" }
                        ],
                        "template": "disableTrading"
                    }
                ],
                "children": []
            },
            {
                "id": "MarketSentimentAnalysis",
                "type": "container",
                "subtype": "group",
                "title": "Market Sentiment Analysis",
                "backgroundColor": "teal",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Analyze overall market sentiment",
                "variables": [
                    { "id": "sentimentThreshold", "name": "Sentiment Threshold", "type": "float", "value": 0.6, "description": "Threshold for positive sentiment (0-1)" }
                ],
                "conditions": [
                    {
                        "id": "SocialMediaSentiment",
                        "type": "condition",
                        "subtype": "externalDataCondition",
                        "title": "if",
                        "message": "Social media sentiment score for {params[0]} {params[1]} {params[2]}",
                        "active": true,
                        "params": [
                            { "value": "crypto", "text": "crypto market", "color": "yellow", "type": "market", "unit": "" },
                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                            { "value": "0.6", "text": "0.6", "color": "white", "type": "score", "unit": "" }
                        ]
                    },
                    {
                        "id": "NewsAnalysis",
                        "type": "condition",
                        "subtype": "externalDataCondition",
                        "title": "and",
                        "message": "News sentiment for {params[0]} is {params[1]}",
                        "active": true,
                        "params": [
                            { "value": "crypto", "text": "crypto market", "color": "yellow", "type": "market", "unit": "" },
                            { "value": "positive", "text": "Positive", "color": "lawngreen", "type": "sentiment", "unit": "" }
                        ]
                    }
                ],
                "actions": [
                    {
                        "id": "IncreaseLeverageAction",
                        "type": "action",
                        "title": "action",
                        "message": "Increase max leverage for all trades by {params[0]}",
                        "active": true,
                        "params": [
                            { "value": "1", "text": "1x", "color": "orange", "type": "leverage", "unit": "x" }
                        ],
                        "template": "adjustLeverage"
                    }
                ],
                "children": []
            },
            {
                "id": "PortfolioRebalancing",
                "type": "container",
                "subtype": "group",
                "title": "Portfolio Rebalancing",
                "backgroundColor": "navy",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Periodic portfolio rebalancing",
                "variables": [
                    { "id": "rebalancePeriod", "name": "Rebalance Period", "type": "string", "value": "1w", "description": "Period for portfolio rebalancing" },
                    { "id": "btcWeight", "name": "BTC Weight", "type": "float", "value": 0.4, "description": "Target weight for BTC in portfolio" },
                    { "id": "ethWeight", "name": "ETH Weight", "type": "float", "value": 0.3, "description": "Target weight for ETH in portfolio" },
                    { "id": "solWeight", "name": "SOL Weight", "type": "float", "value": 0.2, "description": "Target weight for SOL in portfolio" },
                    { "id": "usdtWeight", "name": "USDT Weight", "type": "float", "value": 0.1, "description": "Target weight for USDT in portfolio" }
                ],
                "conditions": [
                    {
                        "id": "RebalancePeriodCheck",
                        "type": "condition",
                        "subtype": "timeCondition",
                        "title": "if",
                        "message": "Current time is the start of a {params[0]} period",
                        "active": true,
                        "params": [
                            { "value": "1w", "text": "1 week", "color": "aqua", "type": "duration", "unit": "" }
                        ]
                    }
                ],
                "actions": [
                    {
                        "id": "RebalancePortfolio",
                        "type": "action",
                        "title": "action",
                        "message": "Rebalance portfolio to target weights: BTC {params[0]}, ETH {params[1]}, SOL {params[2]}, USDT {params[3]}",
                        "active": true,
                        "params": [
                            { "value": "40", "text": "40%", "color": "orange", "type": "percentage", "unit": "%" },
                            { "value": "30", "text": "30%", "color": "purple", "type": "percentage", "unit": "%" },
                            { "value": "20", "text": "20%", "color": "green", "type": "percentage", "unit": "%" },
                            { "value": "10", "text": "10%", "color": "gray", "type": "percentage", "unit": "%" }
                        ],
                        "template": "rebalancePortfolio"
                    }
                ],
                "children": []
            }
        ]
    },
    {
        "id": "SY5ysCajjkeDKG4J0dzE8w",
        "type": "container",
        "subtype": "group",
        "title": "Main Trading Strategy",
        "backgroundColor": "cornflowerblue",
        "textColor": "black",
        "highlight": "",
        "showChildren": true,
        "active": true,
        "message": "Overall trading strategy for multiple cryptocurrencies",
        "variables": [
            { "id": "globalRiskLevel", "name": "Global Risk Level", "type": "integer", "value": 3, "description": "Risk level from 1 (low) to 5 (high)" },
            { "id": "maxOpenPositions", "name": "Max Open Positions", "type": "integer", "value": 5, "description": "Maximum number of open positions allowed" }
        ],
        "conditions": [],
        "actions": [],
        "children": [
            {
                "id": "BTCTradingGroup",
                "type": "container",
                "subtype": "group",
                "title": "BTC Trading Strategy",
                "backgroundColor": "orange",
                "textColor": "black",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Bitcoin",
                "variables": [
                    { "id": "BTCStopLoss", "name": "BTC Stop Loss %", "type": "float", "value": 2.5, "description": "Stop loss percentage for BTC trades" },
                    { "id": "BTCTakeProfit", "name": "BTC Take Profit %", "type": "float", "value": 5.0, "description": "Take profit percentage for BTC trades" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "BTCEntryCondition",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Entry Condition",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for entering a BTC trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "BTCPriceCondition",
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
                                    { "value": "20", "text": "20", "type": "candle", "color": "white", "unit": "" }
                                ]
                            },
                            {
                                "id": "BTCVolumeCondition",
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
                            }
                        ],
                        "actions": [
                            {
                                "id": "BTCLongEntry",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                "active": true,
                                "params": [
                                    { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1000", "text": "1000", "color": "white", "type": "amount", "unit": "$" },
                                    { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" }
                                ],
                                "template": "placeOrder"
                            }
                        ],
                        "children": [
                            {
                                "id": "BTCEntryConfirmation",
                                "type": "container",
                                "subtype": "if",
                                "title": "BTC Entry Confirmation",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Additional confirmation for BTC entry",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "BTCRSICondition",
                                        "type": "condition",
                                        "subtype": "indicatorCondition",
                                        "title": "if",
                                        "message": "RSI(14) on {params[0]} {params[1]} {params[2]} on {params[3]} timeframe",
                                        "active": true,
                                        "params": [
                                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "lt", "text": "Less than", "color": "lawngreen", "type": "operator", "unit": "" },
                                            { "value": "30", "text": "30", "color": "white", "type": "indicatorValue", "unit": "" },
                                            { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "BTCIncreaseLeverage",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Increase leverage for BTC trade to {params[0]}",
                                        "active": true,
                                        "params": [
                                            { "value": "5", "text": "5x", "color": "orange", "type": "leverage", "unit": "x" }
                                        ],
                                        "template": "adjustLeverage"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "BTCExitCondition",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Exit Condition",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for exiting a BTC trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "BTCProfitCondition",
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
                            }
                        ],
                        "actions": [
                            {
                                "id": "BTCClosePosition",
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
                "id": "AltcoinTradingGroup",
                "type": "container",
                "subtype": "group",
                "title": "Altcoin Trading Strategies",
                "backgroundColor": "purple",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategies for various altcoins",
                "variables": [],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "ETHTradingStrategy",
                        "type": "container",
                        "subtype": "group",
                        "title": "ETH Trading Strategy",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Trading strategy for Ethereum",
                        "variables": [
                            { "id": "ETHStopLoss", "name": "ETH Stop Loss %", "type": "float", "value": 3.0, "description": "Stop loss percentage for ETH trades" }
                        ],
                        "conditions": [],
                        "actions": [],
                        "children": [
                            {
                                "id": "ETHEntryCondition",
                                "type": "container",
                                "subtype": "if",
                                "title": "ETH Entry Condition",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Conditions for entering an ETH trade",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "ETHMACondition",
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
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "ETHLongEntry",
                                        "type": "action",
                                        "title": "action",
                                        "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                        "active": true,
                                        "params": [
                                            { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                            { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "800", "text": "800", "color": "white", "type": "amount", "unit": "$" },
                                            { "value": "2", "text": "2x", "color": "orange", "type": "leverage", "unit": "x" }
                                        ],
                                        "template": "placeOrder"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "SOLTradingStrategy",
                        "type": "container",
                        "subtype": "group",
                        "title": "SOL Trading Strategy",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Trading strategy for Solana",
                        "variables": [
                            { "id": "SOLStopLoss", "name": "SOL Stop Loss %", "type": "float", "value": 4.0, "description": "Stop loss percentage for SOL trades" }
                        ],
                        "conditions": [],
                        "actions": [],
                        "children": [
                            {
                                "id": "SOLEntryCondition",
                                "type": "container",
                                "subtype": "if",
                                "title": "SOL Entry Condition",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Conditions for entering a SOL trade",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "SOLBollingerBandCondition",
                                        "type": "condition",
                                        "subtype": "indicatorCondition",
                                        "title": "if",
                                        "message": "{params[0]} price touches lower Bollinger Band(20,2) on {params[1]} timeframe",
                                        "active": true,
                                        "params": [
                                            { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "SOLLongEntry",
                                        "type": "action",
                                        "title": "action",
                                        "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage",
                                        "active": true,
                                        "params": [
                                            { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                            { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "500", "text": "500", "color": "white", "type": "amount", "unit": "$" },
                                            { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" }
                                        ],
                                        "template": "placeOrder"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "RiskManagementSystem",
                "type": "container",
                "subtype": "group",
                "title": "Risk Management System",
                "backgroundColor": "red",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Overall risk management for the trading system",
                "variables": [
                    { "id": "maxDailyLoss", "name": "Max Daily Loss", "type": "float", "value": 5.0, "description": "Maximum allowed daily loss percentage" },
                    { "id": "maxWeeklyLoss", "name": "Max Weekly Loss", "type": "float", "value": 15.0, "description": "Maximum allowed weekly loss percentage" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "DailyLossCheck",
                        "type": "container",
                        "subtype": "if",
                        "title": "Daily Loss Check",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Check if daily loss exceeds maximum allowed",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "DailyLossCondition",
                                "type": "condition",
                                "subtype": "portfolioCondition",
                                "title": "if",
                                "message": "Daily loss percentage {params[0]} {params[1]}",
                                "active": true,
                                "params": [
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "5", "text": "5%", "color": "white", "type": "percentage", "unit": "%" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "CloseAllPositions",
                                "type": "action",
                                "title": "action",
                                "message": "Close all open positions",
                                "active": true,
                                "params": [],
                                "template": "closeAllPositions"
                            },
                            {
                                "id": "DisableTrading",
                                "type": "action",
                                "title": "action",
                                "message": "Disable trading for {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "24h", "text": "24 hours", "color": "aqua", "type": "duration", "unit": "" }
                                ],
                                "template": "disableTrading"
                            }
                        ],
                        "children": []
                    },
                    {
                        "id": "WeeklyLossCheck",
                        "type": "container",
                        "subtype": "if",
                        "title": "Weekly Loss Check",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Check if weekly loss exceeds maximum allowed",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "WeeklyLossCondition",
                                "type": "condition",
                                "subtype": "portfolioCondition",
                                "title": "if",
                                "message": "Weekly loss percentage {params[0]} {params[1]}",
                                "active": true,
                                "params": [
                                    { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                    { "value": "15", "text": "15%", "color": "white", "type": "percentage", "unit": "%" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "CloseAllPositions",
                                "type": "action",
                                "title": "action",
                                "message": "Close all open positions",
                                "active": true,
                                "params": [],
                                "template": "closeAllPositions"
                            },
                            {
                                "id": "DisableTrading",
                                "type": "action",
                                "title": "action",
                                "message": "Disable trading for {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "7d", "text": "7 days", "color": "aqua", "type": "duration", "unit": "" }
                                ],
                                "template": "disableTrading"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "MarketAnalysisSystem",
                "type": "container",
                "subtype": "group",
                "title": "Market Analysis System",
                "backgroundColor": "teal",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "System for analyzing market conditions and sentiment",
                "variables": [
                    { "id": "sentimentThreshold", "name": "Sentiment Threshold", "type": "float", "value": 0.6, "description": "Threshold for positive sentiment (0-1)" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "SentimentAnalysis",
                        "type": "container",
                        "subtype": "group",
                        "title": "Sentiment Analysis",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Analyze market sentiment from various sources",
                        "variables": [],
                        "conditions": [],
                        "actions": [],
                        "children": [
                            {
                                "id": "SocialMediaSentiment",
                                "type": "container",
                                "subtype": "if",
                                "title": "Social Media Sentiment",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Analyze sentiment from social media",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "SocialMediaSentimentCondition",
                                        "type": "condition",
                                        "subtype": "externalDataCondition",
                                        "title": "if",
                                        "message": "Social media sentiment score for {params[0]} {params[1]} {params[2]}",
                                        "active": true,
                                        "params": [
                                            { "value": "crypto", "text": "crypto market", "color": "yellow", "type": "market", "unit": "" },
                                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                            { "value": "0.6", "text": "0.6", "color": "white", "type": "score", "unit": "" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "IncreaseLeverageAction",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Increase max leverage for all trades by {params[0]}",
                                        "active": true,
                                        "params": [
                                            { "value": "1", "text": "1x", "color": "orange", "type": "leverage", "unit": "x" }
                                        ],
                                        "template": "adjustLeverage"
                                    }
                                ],
                                "children": []
                            },
                            {
                                "id": "NewsAnalysis",
                                "type": "container",
                                "subtype": "if",
                                "title": "News Analysis",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Analyze sentiment from news sources",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "NewsSentimentCondition",
                                        "type": "condition",
                                        "subtype": "externalDataCondition",
                                        "title": "if",
                                        "message": "News sentiment for {params[0]} is {params[1]}",
                                        "active": true,
                                        "params": [
                                            { "value": "crypto", "text": "crypto market", "color": "yellow", "type": "market", "unit": "" },
                                            { "value": "positive", "text": "Positive", "color": "lawngreen", "type": "sentiment", "unit": "" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "IncreasePositionSizeAction",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Increase position size for all trades by {params[0]}",
                                        "active": true,
                                        "params": [
                                            { "value": "10", "text": "10%", "color": "white", "type": "percentage", "unit": "%" }
                                        ],
                                        "template": "adjustPositionSize"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "TechnicalAnalysis",
                        "type": "container",
                        "subtype": "group",
                        "title": "Technical Analysis",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Perform technical analysis on various timeframes",
                        "variables": [],
                        "conditions": [],
                        "actions": [],
                        "children": [
                            {
                                "id": "TrendAnalysis",
                                "type": "container",
                                "subtype": "if",
                                "title": "Trend Analysis",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Analyze market trends",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "UptrendCondition",
                                        "type": "condition",
                                        "subtype": "technicalIndicatorCondition",
                                        "title": "if",
                                        "message": "{params[0]} is in uptrend on {params[1]} timeframe",
                                        "active": true,
                                        "params": [
                                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "1d", "text": "1 day", "color": "aqua", "type": "timeframe", "unit": "" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "IncreaseLongExposure",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Increase long exposure for {params[0]} by {params[1]}",
                                        "active": true,
                                        "params": [
                                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "20", "text": "20%", "color": "white", "type": "percentage", "unit": "%" }
                                        ],
                                        "template": "adjustExposure"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "PortfolioManagementSystem",
                "type": "container",
                "subtype": "group",
                "title": "Portfolio Management System",
                "backgroundColor": "navy",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "System for managing and rebalancing the portfolio",
                "variables": [
                    { "id": "rebalancePeriod", "name": "Rebalance Period", "type": "string", "value": "1w", "description": "Period for portfolio rebalancing" },
                    { "id": "btcWeight", "name": "BTC Weight", "type": "float", "value": 0.4, "description": "Target weight for BTC in portfolio" },
                    { "id": "ethWeight", "name": "ETH Weight", "type": "float", "value": 0.3, "description": "Target weight for ETH in portfolio" },
                    { "id": "solWeight", "name": "SOL Weight", "type": "float", "value": 0.2, "description": "Target weight for SOL in portfolio" },
                    { "id": "usdtWeight", "name": "USDT Weight", "type": "float", "value": 0.1, "description": "Target weight for USDT in portfolio" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "PeriodicRebalancing",
                        "type": "container",
                        "subtype": "if",
                        "title": "Periodic Rebalancing",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Perform periodic portfolio rebalancing",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "RebalancePeriodCheck",
                                "type": "condition",
                                "subtype": "timeCondition",
                                "title": "if",
                                "message": "Current time is the start of a {params[0]} period",
                                "active": true,
                                "params": [
                                    { "value": "1w", "text": "1 week", "color": "aqua", "type": "duration", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "RebalancePortfolio",
                                "type": "action",
                                "title": "action",
                                "message": "Rebalance portfolio to target weights: BTC {params[0]}, ETH {params[1]}, SOL {params[2]}, USDT {params[3]}",
                                "active": true,
                                "params": [
                                    { "value": "40", "text": "40%", "color": "orange", "type": "percentage", "unit": "%" },
                                    { "value": "30", "text": "30%", "color": "purple", "type": "percentage", "unit": "%" },
                                    { "value": "20", "text": "20%", "color": "green", "type": "percentage", "unit": "%" },
                                    { "value": "10", "text": "10%", "color": "gray", "type": "percentage", "unit": "%" }
                                ],
                                "template": "rebalancePortfolio"
                            }
                        ],
                        "children": []
                    },
                    {
                        "id": "DynamicAllocation",
                        "type": "container",
                        "subtype": "group",
                        "title": "Dynamic Asset Allocation",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Dynamically adjust asset allocation based on market conditions",
                        "variables": [],
                        "conditions": [],
                        "actions": [],
                        "children": [
                            {
                                "id": "VolatilityBasedAllocation",
                                "type": "container",
                                "subtype": "if",
                                "title": "Volatility-Based Allocation",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Adjust allocation based on market volatility",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "HighVolatilityCondition",
                                        "type": "condition",
                                        "subtype": "volatilityCondition",
                                        "title": "if",
                                        "message": "Market volatility is {params[0]} {params[1]} for {params[2]}",
                                        "active": true,
                                        "params": [
                                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                            { "value": "30", "text": "30%", "color": "white", "type": "percentage", "unit": "%" },
                                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "ReduceRiskyAssets",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Reduce allocation to risky assets by {params[0]}",
                                        "active": true,
                                        "params": [
                                            { "value": "10", "text": "10%", "color": "white", "type": "percentage", "unit": "%" }
                                        ],
                                        "template": "adjustAllocation"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ReportingSystem",
                "type": "container",
                "subtype": "group",
                "title": "Reporting System",
                "backgroundColor": "darkgreen",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "System for generating reports and alerts",
                "variables": [
                    { "id": "reportFrequency", "name": "Report Frequency", "type": "string", "value": "1d", "description": "Frequency of generating reports" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "DailyReport",
                        "type": "container",
                        "subtype": "if",
                        "title": "Daily Performance Report",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Generate daily performance report",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "DailyReportTime",
                                "type": "condition",
                                "subtype": "timeCondition",
                                "title": "if",
                                "message": "Current time is {params[0]}",
                                "active": true,
                                "params": [
                                    { "value": "00:00", "text": "00:00 UTC", "color": "aqua", "type": "time", "unit": "" }
                                ]
                            }
                        ],
                        "actions": [
                            {
                                "id": "GenerateDailyReport",
                                "type": "action",
                                "title": "action",
                                "message": "Generate and send daily performance report",
                                "active": true,
                                "params": [],
                                "template": "generateReport"
                            }
                        ],
                        "children": []
                    },
                    {
                        "id": "AlertSystem",
                        "type": "container",
                        "subtype": "group",
                        "title": "Alert System",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "System for generating real-time alerts",
                        "variables": [],
                        "conditions": [],
                        "actions": [],
                        "children": [
                            {
                                "id": "PriceAlert",
                                "type": "container",
                                "subtype": "if",
                                "title": "Price Alert",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Generate alert when price reaches certain level",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "BTCPriceAlertCondition",
                                        "type": "condition",
                                        "subtype": "priceCondition",
                                        "title": "if",
                                        "message": "{params[0]} price {params[1]} {params[2]}",
                                        "active": true,
                                        "params": [
                                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                            { "value": "50000", "text": "50,000", "color": "white", "type": "price", "unit": "$" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "SendPriceAlert",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Send price alert notification",
                                        "active": true,
                                        "params": [],
                                        "template": "sendAlert"
                                    }
                                ],
                                "children": []
                            },
                            {
                                "id": "PerformanceAlert",
                                "type": "container",
                                "subtype": "if",
                                "title": "Performance Alert",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Generate alert when performance reaches certain level",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "DailyProfitAlertCondition",
                                        "type": "condition",
                                        "subtype": "performanceCondition",
                                        "title": "if",
                                        "message": "Daily profit {params[0]} {params[1]}",
                                        "active": true,
                                        "params": [
                                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                                            { "value": "5", "text": "5%", "color": "white", "type": "percentage", "unit": "%" }
                                        ]
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "SendPerformanceAlert",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Send performance alert notification",
                                        "active": true,
                                        "params": [],
                                        "template": "sendAlert"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
        {
            "id": "MainTradingStrategy",
            "type": "container",
            "subtype": "group",
            "title": "Main Trading Strategy",
            "backgroundColor": "cornflowerblue",
            "textColor": "black",
            "highlight": "",
            "showChildren": true,
            "active": true,
            "message": "Overall trading strategy for multiple cryptocurrencies",
            "variables": [
                { "id": "globalRiskLevel", "name": "Global Risk Level", "type": "integer", "value": 3, "description": "Risk level from 1 (low) to 5 (high)" },
                { "id": "maxOpenPositions", "name": "Max Open Positions", "type": "integer", "value": 5, "description": "Maximum number of open positions allowed" },
                { "id": "totalPortfolioValue", "name": "Total Portfolio Value", "type": "float", "value": 100000, "description": "Total value of the portfolio in USDT" }
            ],
            "conditions": [],
            "actions": [],
            "children": [
                {
                    "id": "TrendFollowingStrategy",
                    "type": "container",
                    "subtype": "group",
                    "title": "Trend Following Strategy",
                    "backgroundColor": "lightgreen",
                    "textColor": "black",
                    "highlight": "",
                    "showChildren": true,
                    "active": true,
                    "message": "Strategy based on following market trends",
                    "variables": [
                        { "id": "trendStrengthThreshold", "name": "Trend Strength Threshold", "type": "float", "value": 25, "description": "Minimum ADX value to confirm trend" }
                    ],
                    "conditions": [],
                    "actions": [],
                    "children": [
                        {
                            "id": "BTCUSDTTrendFollowing",
                            "type": "container",
                            "subtype": "if",
                            "title": "BTC/USDT Trend Following",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Trend following strategy for BTC/USDT",
                            "variables": [],
                            "conditions": [
                                {
                                    "id": "BTCUSDTUptrend",
                                    "type": "condition",
                                    "subtype": "technicalIndicatorCondition",
                                    "title": "if",
                                    "message": "{params[0]} {params[1]} is above {params[2]} and ADX({params[3]}) > {params[4]} on {params[5]} timeframe",
                                    "active": true,
                                    "params": [
                                        { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                        { "value": "EMA20", "text": "20-period EMA", "color": "aqua", "type": "indicator", "unit": "" },
                                        { "value": "EMA50", "text": "50-period EMA", "color": "pink", "type": "indicator", "unit": "" },
                                        { "value": "14", "text": "14", "color": "white", "type": "period", "unit": "" },
                                        { "value": "25", "text": "25", "color": "white", "type": "threshold", "unit": "" },
                                        { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                }
                            ],
                            "actions": [
                                {
                                    "id": "BTCUSDTLongEntry",
                                    "type": "action",
                                    "title": "action",
                                    "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage, stop loss at {params[4]}%, take profit at {params[5]}%",
                                    "active": true,
                                    "params": [
                                        { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                        { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                        { "value": "2", "text": "2%", "color": "white", "type": "percentage", "unit": "%" },
                                        { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" },
                                        { "value": "2", "text": "2%", "color": "red", "type": "percentage", "unit": "%" },
                                        { "value": "6", "text": "6%", "color": "green", "type": "percentage", "unit": "%" }
                                    ],
                                    "template": "placeOrder"
                                }
                            ],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "MeanReversionStrategy",
                    "type": "container",
                    "subtype": "group",
                    "title": "Mean Reversion Strategy",
                    "backgroundColor": "lightyellow",
                    "textColor": "black",
                    "highlight": "",
                    "showChildren": true,
                    "active": true,
                    "message": "Strategy based on price returning to the mean",
                    "variables": [
                        { "id": "oversoldRSIThreshold", "name": "Oversold RSI Threshold", "type": "float", "value": 30, "description": "RSI value to consider asset oversold" },
                        { "id": "overboughtRSIThreshold", "name": "Overbought RSI Threshold", "type": "float", "value": 70, "description": "RSI value to consider asset overbought" }
                    ],
                    "conditions": [],
                    "actions": [],
                    "children": [
                        {
                            "id": "ETHUSDTMeanReversion",
                            "type": "container",
                            "subtype": "if",
                            "title": "ETH/USDT Mean Reversion",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Mean reversion strategy for ETH/USDT",
                            "variables": [],
                            "conditions": [
                                {
                                    "id": "ETHUSDTOversold",
                                    "type": "condition",
                                    "subtype": "technicalIndicatorCondition",
                                    "title": "if",
                                    "message": "RSI(14) of {params[0]} is below {params[1]} on {params[2]} timeframe",
                                    "active": true,
                                    "params": [
                                        { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                        { "value": "30", "text": "30", "color": "white", "type": "threshold", "unit": "" },
                                        { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                }
                            ],
                            "actions": [
                                {
                                    "id": "ETHUSDTLongEntry",
                                    "type": "action",
                                    "title": "action",
                                    "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage, stop loss at {params[4]}%, take profit at {params[5]}%",
                                    "active": true,
                                    "params": [
                                        { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                        { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                        { "value": "1.5", "text": "1.5%", "color": "white", "type": "percentage", "unit": "%" },
                                        { "value": "2", "text": "2x", "color": "orange", "type": "leverage", "unit": "x" },
                                        { "value": "3", "text": "3%", "color": "red", "type": "percentage", "unit": "%" },
                                        { "value": "4.5", "text": "4.5%", "color": "green", "type": "percentage", "unit": "%" }
                                    ],
                                    "template": "placeOrder"
                                }
                            ],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "BreakoutStrategy",
                    "type": "container",
                    "subtype": "group",
                    "title": "Breakout Strategy",
                    "backgroundColor": "lightblue",
                    "textColor": "black",
                    "highlight": "",
                    "showChildren": true,
                    "active": true,
                    "message": "Strategy based on price breakouts",
                    "variables": [
                        { "id": "volumeConfirmationThreshold", "name": "Volume Confirmation Threshold", "type": "float", "value": 1.5, "description": "Minimum volume increase to confirm breakout" }
                    ],
                    "conditions": [],
                    "actions": [],
                    "children": [
                        {
                            "id": "SOLUSDTBreakout",
                            "type": "container",
                            "subtype": "if",
                            "title": "SOL/USDT Breakout",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Breakout strategy for SOL/USDT",
                            "variables": [],
                            "conditions": [
                                {
                                    "id": "SOLUSDTBreakoutCondition",
                                    "type": "condition",
                                    "subtype": "priceBreakoutCondition",
                                    "title": "if",
                                    "message": "{params[0]} breaks above {params[1]} period high with volume {params[2]} times average on {params[3]} timeframe",
                                    "active": true,
                                    "params": [
                                        { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                        { "value": "20", "text": "20", "color": "white", "type": "period", "unit": "" },
                                        { "value": "1.5", "text": "1.5", "color": "white", "type": "multiplier", "unit": "x" },
                                        { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                }
                            ],
                            "actions": [
                                {
                                    "id": "SOLUSDTLongEntry",
                                    "type": "action",
                                    "title": "action",
                                    "message": "{params[0]} {params[1]} {params[2]} with {params[3]} leverage, stop loss at {params[4]}%, take profit at {params[5]}%",
                                    "active": true,
                                    "params": [
                                        { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                                        { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                        { "value": "1", "text": "1%", "color": "white", "type": "percentage", "unit": "%" },
                                        { "value": "3", "text": "3x", "color": "orange", "type": "leverage", "unit": "x" },
                                        { "value": "5", "text": "5%", "color": "red", "type": "percentage", "unit": "%" },
                                        { "value": "15", "text": "15%", "color": "green", "type": "percentage", "unit": "%" }
                                    ],
                                    "template": "placeOrder"
                                }
                            ],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "RiskManagementRules",
                    "type": "container",
                    "subtype": "group",
                    "title": "Risk Management Rules",
                    "backgroundColor": "pink",
                    "textColor": "black",
                    "highlight": "",
                    "showChildren": true,
                    "active": true,
                    "message": "Rules for managing overall portfolio risk",
                    "variables": [
                        { "id": "maxDailyLoss", "name": "Max Daily Loss", "type": "float", "value": 3, "description": "Maximum allowed daily loss as percentage of portfolio" },
                        { "id": "maxDrawdown", "name": "Max Drawdown", "type": "float", "value": 15, "description": "Maximum allowed drawdown as percentage of portfolio" }
                    ],
                    "conditions": [],
                    "actions": [],
                    "children": [
                        {
                            "id": "DailyLossCheck",
                            "type": "container",
                            "subtype": "if",
                            "title": "Daily Loss Check",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Check if daily loss exceeds maximum allowed",
                            "variables": [],
                            "conditions": [
                                {
                                    "id": "ExcessiveDailyLoss",
                                    "type": "condition",
                                    "subtype": "portfolioCondition",
                                    "title": "if",
                                    "message": "Daily loss percentage > {params[0]}% of portfolio value",
                                    "active": true,
                                    "params": [
                                        { "value": "3", "text": "3%", "color": "red", "type": "percentage", "unit": "%" }
                                    ]
                                },
                                {
                                    "id": "MultipleEMACrossover",
                                    "type": "condition",
                                    "subtype": "technicalIndicatorCondition",
                                    "title": "if",
                                    "message": "{params[0]} {params[1]} crosses above both {params[2]} and {params[3]} on {params[4]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "EMA10", "text": "10-period EMA", "color": "aqua", "type": "indicator", "unit": "" },
                                      { "value": "EMA20", "text": "20-period EMA", "color": "pink", "type": "indicator", "unit": "" },
                                      { "value": "EMA50", "text": "50-period EMA", "color": "purple", "type": "indicator", "unit": "" },
                                      { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                  {
                                    "id": "IchimokuCloudBreakout",
                                    "type": "condition",
                                    "subtype": "technicalIndicatorCondition",
                                    "title": "if",
                                    "message": "{params[0]} price breaks above Ichimoku Cloud and Chikou Span is above price on {params[1]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "1d", "text": "1 day", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                  {
                                    "id": "RSIDivergence",
                                    "type": "condition",
                                    "subtype": "technicalIndicatorCondition",
                                    "title": "if",
                                    "message": "Bullish RSI divergence detected for {params[0]} on {params[1]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "adausdt", "text": "ADA/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "6h", "text": "6 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                
                                  // Volume Analysis Conditions
                                  {
                                    "id": "VolumeBreakout",
                                    "type": "condition",
                                    "subtype": "volumeCondition",
                                    "title": "if",
                                    "message": "{params[0]} volume is {params[1]} times higher than {params[2]}-period average volume on {params[3]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "dogeusdt", "text": "DOGE/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "3", "text": "3", "color": "white", "type": "multiplier", "unit": "x" },
                                      { "value": "20", "text": "20", "color": "white", "type": "period", "unit": "" },
                                      { "value": "15m", "text": "15 minutes", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                  {
                                    "id": "OBVTrend",
                                    "type": "condition",
                                    "subtype": "technicalIndicatorCondition",
                                    "title": "if",
                                    "message": "On-Balance Volume (OBV) of {params[0]} is in uptrend for last {params[1]} periods on {params[2]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "linkusdt", "text": "LINK/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "10", "text": "10", "color": "white", "type": "period", "unit": "" },
                                      { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                
                                  // Volatility Conditions
                                  {
                                    "id": "BollingerBandSqueeze",
                                    "type": "condition",
                                    "subtype": "volatilityCondition",
                                    "title": "if",
                                    "message": "Bollinger Bands of {params[0]} are squeezing (width < {params[1]}% of price) on {params[2]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "xrpusdt", "text": "XRP/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "2", "text": "2", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "1h", "text": "1 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                  {
                                    "id": "ATRIncrease",
                                    "type": "condition",
                                    "subtype": "volatilityCondition",
                                    "title": "if",
                                    "message": "Average True Range (ATR) of {params[0]} increases by {params[1]}% in last {params[2]} periods on {params[3]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "dotusdt", "text": "DOT/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "20", "text": "20", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "5", "text": "5", "color": "white", "type": "period", "unit": "" },
                                      { "value": "30m", "text": "30 minutes", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                                
                                  // Market Sentiment Conditions
                                  {
                                    "id": "CryptoFearGreedIndex",
                                    "type": "condition",
                                    "subtype": "sentimentCondition",
                                    "title": "if",
                                    "message": "Crypto Fear & Greed Index is in {params[0]} zone (value <= {params[1]})",
                                    "active": true,
                                    "params": [
                                      { "value": "fear", "text": "Fear", "color": "red", "type": "sentiment", "unit": "" },
                                      { "value": "30", "text": "30", "color": "white", "type": "threshold", "unit": "" }
                                    ]
                                  },
                                  {
                                    "id": "SocialMediaMentions",
                                    "type": "condition",
                                    "subtype": "sentimentCondition",
                                    "title": "if",
                                    "message": "Social media mentions for {params[0]} increase by {params[1]}% in last {params[2]} hours",
                                    "active": true,
                                    "params": [
                                      { "value": "btc", "text": "Bitcoin", "color": "yellow", "type": "asset", "unit": "" },
                                      { "value": "50", "text": "50", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "24", "text": "24", "color": "white", "type": "duration", "unit": "hours" }
                                    ]
                                  },
                                
                                  // On-Chain Analysis Conditions
                                  {
                                    "id": "LargeTransactions",
                                    "type": "condition",
                                    "subtype": "onChainCondition",
                                    "title": "if",
                                    "message": "Number of large transactions (> {params[0]} {params[1]}) increases by {params[2]}% in last {params[3]} hours",
                                    "active": true,
                                    "params": [
                                      { "value": "1000000", "text": "1 million", "color": "white", "type": "amount", "unit": "" },
                                      { "value": "usdt", "text": "USDT", "color": "yellow", "type": "asset", "unit": "" },
                                      { "value": "30", "text": "30", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "12", "text": "12", "color": "white", "type": "duration", "unit": "hours" }
                                    ]
                                  },
                                  {
                                    "id": "ExchangeNetFlow",
                                    "type": "condition",
                                    "subtype": "onChainCondition",
                                    "title": "if",
                                    "message": "Net flow of {params[0]} to exchanges is negative for {params[1]} consecutive days",
                                    "active": true,
                                    "params": [
                                      { "value": "eth", "text": "Ethereum", "color": "yellow", "type": "asset", "unit": "" },
                                      { "value": "5", "text": "5", "color": "white", "type": "duration", "unit": "days" }
                                    ]
                                  },
                                
                                  // Correlation Conditions
                                  {
                                    "id": "BTCCorrelation",
                                    "type": "condition",
                                    "subtype": "correlationCondition",
                                    "title": "if",
                                    "message": "Correlation between {params[0]} and BTC drops below {params[1]} on {params[2]} timeframe",
                                    "active": true,
                                    "params": [
                                      { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "0.5", "text": "0.5", "color": "white", "type": "correlation", "unit": "" },
                                      { "value": "1d", "text": "1 day", "color": "aqua", "type": "timeframe", "unit": "" }
                                    ]
                                  },
                            ],
                            "actions": [
                                {
                                    "id": "CloseAllPositions",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Close all open positions",
                                    "active": true,
                                    "params": [],
                                    "template": "closeAllPositions"
                                },
                                {
                                    "id": "DisableTrading",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Disable trading for {params[0]}",
                                    "active": true,
                                    "params": [
                                        { "value": "24h", "text": "24 hours", "color": "aqua", "type": "duration", "unit": "" }
                                    ],
                                    "template": "disableTrading"
                                },
                                // Advanced Order Actions
                                {
                                    "id": "TrailingStopLoss",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Place trailing stop loss for {params[0]} at {params[1]}% with {params[2]}% callback",
                                    "active": true,
                                    "params": [
                                      { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "5", "text": "5", "color": "red", "type": "percentage", "unit": "%" },
                                      { "value": "1", "text": "1", "color": "white", "type": "percentage", "unit": "%" }
                                    ],
                                    "template": "placeTrailingStopLoss"
                                  },
                                  {
                                    "id": "ScaledEntry",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Place scaled entry orders for {params[0]} : {params[1]}% at market, {params[2]}% at {params[3]}% below, {params[4]}% at {params[5]}% below",
                                    "active": true,
                                    "params": [
                                      { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "40", "text": "40", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "30", "text": "30", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "2", "text": "2", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "30", "text": "30", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "5", "text": "5", "color": "white", "type": "percentage", "unit": "%" }
                                    ],
                                    "template": "placeScaledEntryOrders"
                                  },
                                
                                  // Position Management Actions
                                  {
                                    "id": "AdjustLeverage",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Adjust leverage for {params[0]} position to {params[1]}x",
                                    "active": true,
                                    "params": [
                                      { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "5", "text": "5", "color": "orange", "type": "leverage", "unit": "x" }
                                    ],
                                    "template": "adjustLeverage"
                                  },
                                  {
                                    "id": "PartialClose",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Close {params[0]}% of {params[1]} position",
                                    "active": true,
                                    "params": [
                                      { "value": "50", "text": "50", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" }
                                    ],
                                    "template": "partialClosePosition"
                                  },
                                
                                  // Risk Management Actions
                                  {
                                    "id": "AdjustPositionSize",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Adjust position size to risk {params[0]}% of portfolio on {params[1]}",
                                    "active": true,
                                    "params": [
                                      { "value": "1", "text": "1", "color": "white", "type": "percentage", "unit": "%" },
                                      { "value": "adausdt", "text": "ADA/USDT", "color": "yellow", "type": "symbol", "unit": "" }
                                    ],
                                    "template": "adjustPositionSize"
                                  },
                                  {
                                    "id": "HedgePosition",
                                    "type": "action",
                                    "title": "action",
                                    "message": "Open hedge position for {params[0]} with {params[1]}% size of current position",
                                    "active": true,
                                    "params": [
                                      { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                      { "value": "50", "text": "50", "color": "white", "type": "percentage", "unit": "%" }
                                    ],
                                    "template": "openHedgePosition"
                                  },
                                
                                  // Portfolio Management Actions
                                  {
                                  "id": "Rebalance",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Rebalance portfolio to: {params[0]}% {params[1]}, {params[2]}% {params[3]}, {params[4]}% {params[5]}",
                                  "active": true,
                                  "params": [
                                    { "value": "50", "text": "50", "color": "white", "type": "percentage", "unit": "%" },
                                    { "value": "btc", "text": "BTC", "color": "orange", "type": "asset", "unit": "" },
                                    { "value": "30", "text": "30", "color": "white", "type": "percentage", "unit": "%" },
                                    { "value": "eth", "text": "ETH", "color": "blue", "type": "asset", "unit": "" },
                                    { "value": "20", "text": "20", "color": "white", "type": "percentage", "unit": "%" },
                                    { "value": "usdt", "text": "USDT", "color": "green", "type": "asset", "unit": "" }
                                  ],
                                  "template": "rebalancePortfolio"
                                },
                                {
                                  "id": "DiversifyPortfolio",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Diversify {params[0]}% of portfolio into top {params[1]} assets by market cap",
                                  "active": true,
                                  "params": [
                                    { "value": "20", "text": "20", "color": "white", "type": "percentage", "unit": "%" },
                                    { "value": "10", "text": "10", "color": "white", "type": "number", "unit": "" }
                                  ],
                                  "template": "diversifyPortfolio"
                                },
                              
                                // Notification Actions
                                {
                                  "id": "SendAlert",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Send alert: {params[0]} for {params[1]} on {params[2]} timeframe",
                                  "active": true,
                                  "params": [
                                    { "value": "priceTarget", "text": "Price target reached", "color": "green", "type": "alertType", "unit": "" },
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "4h", "text": "4 hour", "color": "aqua", "type": "timeframe", "unit": "" }
                                  ],
                                  "template": "sendAlert"
                                },
                                {
                                  "id": "GenerateReport",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Generate and send {params[0]} report for {params[1]}",
                                  "active": true,
                                  "params": [
                                    { "value": "daily", "text": "Daily", "color": "white", "type": "reportFrequency", "unit": "" },
                                    { "value": "portfolio", "text": "entire portfolio", "color": "blue", "type": "reportScope", "unit": "" }
                                  ],
                                  "template": "generateReport"
                                },
                              
                                // Advanced Trading Strategies
                                {
                                  "id": "GridTrading",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Set up grid trading for {params[0]} between {params[1]} and {params[2]} with {params[3]} levels",
                                  "active": true,
                                  "params": [
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1500", "text": "1500", "color": "white", "type": "price", "unit": "USDT" },
                                    { "value": "2000", "text": "2000", "color": "white", "type": "price", "unit": "USDT" },
                                    { "value": "10", "text": "10", "color": "white", "type": "number", "unit": "" }
                                  ],
                                  "template": "setupGridTrading"
                                },
                                {
                                  "id": "DCAStrategy",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Start DCA strategy for {params[0]}: Buy {params[1]} worth every {params[2]} for {params[3]}",
                                  "active": true,
                                  "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "100", "text": "100", "color": "white", "type": "amount", "unit": "USDT" },
                                    { "value": "1d", "text": "1 day", "color": "aqua", "type": "timeframe", "unit": "" },
                                    { "value": "30d", "text": "30 days", "color": "white", "type": "duration", "unit": "" }
                                  ],
                                  "template": "startDCAStrategy"
                                },
                              
                                // Market Making Actions
                                {
                                  "id": "SetupMarketMaking",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Setup market making for {params[0]} with {params[1]}% spread and {params[2]} order size",
                                  "active": true,
                                  "params": [
                                    { "value": "linkusdt", "text": "LINK/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "0.5", "text": "0.5", "color": "white", "type": "percentage", "unit": "%" },
                                    { "value": "100", "text": "100", "color": "white", "type": "amount", "unit": "USDT" }
                                  ],
                                  "template": "setupMarketMaking"
                                },
                              
                                // Arbitrage Actions
                                {
                                  "id": "TriangularArbitrage",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Execute triangular arbitrage: {params[0]} -> {params[1]} -> {params[2]} -> {params[0]} if profit > {params[3]}%",
                                  "active": true,
                                  "params": [
                                    { "value": "usdt", "text": "USDT", "color": "green", "type": "asset", "unit": "" },
                                    { "value": "btc", "text": "BTC", "color": "orange", "type": "asset", "unit": "" },
                                    { "value": "eth", "text": "ETH", "color": "blue", "type": "asset", "unit": "" },
                                    { "value": "0.5", "text": "0.5", "color": "white", "type": "percentage", "unit": "%" }
                                  ],
                                  "template": "executeTriangularArbitrage"
                                },
                              
                                // Machine Learning Integration
                                {
                                  "id": "MLPrediction",
                                  "type": "condition",
                                  "subtype": "mlCondition",
                                  "title": "if",
                                  "message": "ML model predicts {params[0]} price will {params[1]} by {params[2]}% in next {params[3]}",
                                  "active": true,
                                  "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "increase", "text": "increase", "color": "green", "type": "direction", "unit": "" },
                                    { "value": "5", "text": "5", "color": "white", "type": "percentage", "unit": "%" },
                                    { "value": "24h", "text": "24 hours", "color": "aqua", "type": "timeframe", "unit": "" }
                                  ]
                                },
                              
                                // Advanced Risk Management
                                {
                                  "id": "DynamicStopLoss",
                                  "type": "action",
                                  "title": "action",
                                  "message": "Set dynamic stop loss for {params[0]} at {params[1]} ATR below entry price",
                                  "active": true,
                                  "params": [
                                    { "value": "ethusdt", "text": "ETH/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "3", "text": "3", "color": "white", "type": "multiplier", "unit": "x" }
                                  ],
                                  "template": "setDynamicStopLoss"
                                },
                              
                                // Liquidity Analysis
                                {
                                  "id": "LiquidityCheck",
                                  "type": "condition",
                                  "subtype": "liquidityCondition",
                                  "title": "if",
                                  "message": "Order book depth for {params[0]} is less than {params[1]} {params[2]} within {params[3]}% of current price",
                                  "active": true,
                                  "params": [
                                    { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                                    { "value": "1000000", "text": "1 million", "color": "white", "type": "amount", "unit": "" },
                                    { "value": "usdt", "text": "USDT", "color": "green", "type": "asset", "unit": "" },
                                    { "value": "2", "text": "2", "color": "white", "type": "percentage", "unit": "%" }
                                  ]
                                }
                            ],
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "MainTradingSystem",
            "type": "container",
            "subtype": "group",
            "title": "Main Trading System",
            "backgroundColor": "navy",
            "textColor": "white",
            "highlight": "true",
            "showChildren": true,
            "active": true,
            "message": "Overall trading system for multiple cryptocurrencies",
            "variables": [
              { "id": "totalPortfolioValue", "name": "Total Portfolio Value", "type": "float", "value": 100000, "description": "Total value of the portfolio in USDT" },
              { "id": "maxRiskPerTrade", "name": "Max Risk Per Trade", "type": "float", "value": 1, "description": "Maximum risk per trade as a percentage of portfolio" }
            ],
            "conditions": [
              {
                "id": "MarketOpenCondition",
                "type": "condition",
                "subtype": "timeCondition",
                "title": "if",
                "message": "Current time is within trading hours (00:00 - 23:59 UTC)",
                "active": true,
                "params": []
              }
            ],
            "actions": [
              {
                "id": "UpdatePortfolioValue",
                "type": "action",
                "title": "action",
                "message": "Update total portfolio value",
                "active": true,
                "params": [],
                "template": "updatePortfolioValue"
              }
            ],
            "children": [
              {
                "id": "BTCTradingStrategy",
                "type": "container",
                "subtype": "group",
                "title": "BTC Trading Strategy",
                "backgroundColor": "orange",
                "textColor": "black",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Bitcoin",
                "variables": [
                  { "id": "btcAllocation", "name": "BTC Allocation", "type": "float", "value": 40, "description": "Percentage of portfolio allocated to BTC" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                  {
                    "id": "BTCTrendAnalysis",
                    "type": "container",
                    "subtype": "group",
                    "title": "BTC Trend Analysis",
                    "highlight": "",
                    "showChildren": true,
                    "active": true,
                    "message": "Analyze BTC market trend",
                    "variables": [],
                    "conditions": [
                      {
                        "id": "BTCBullishTrend",
                        "type": "condition",
                        "subtype": "technicalIndicatorCondition",
                        "title": "if",
                        "message": "BTC/USDT price is above 200-day EMA on 1D timeframe",
                        "active": true,
                        "params": []
                      }
                    ],
                    "actions": [],
                    "children": [
                      {
                        "id": "BTCEntryStrategy",
                        "type": "container",
                        "subtype": "group",
                        "title": "BTC Entry Strategy",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Strategy for entering BTC positions",
                        "variables": [],
                        "conditions": [],
                        "actions": [],
                        "children": [
                          {
                            "id": "BTCBuySetup",
                            "type": "container",
                            "subtype": "if",
                            "title": "BTC Buy Setup",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Conditions for BTC buy entry",
                            "variables": [],
                            "conditions": [
                              {
                                "id": "BTCRSIOverSold",
                                "type": "condition",
                                "subtype": "technicalIndicatorCondition",
                                "title": "if",
                                "message": "RSI(14) < 30 on 4H timeframe for BTC/USDT",
                                "active": true,
                                "params": []
                              },
                              {
                                "id": "BTCPositiveDivergence",
                                "type": "condition",
                                "subtype": "technicalIndicatorCondition",
                                "title": "and",
                                "message": "Positive RSI divergence detected on 4H timeframe for BTC/USDT",
                                "active": true,
                                "params": []
                              }
                            ],
                            "actions": [
                              {
                                "id": "BTCLongEntry",
                                "type": "action",
                                "title": "action",
                                "message": "Enter long position for BTC/USDT",
                                "active": true,
                                "params": [
                                  { "value": "1", "text": "1% of portfolio value", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "enterLongPosition"
                              }
                            ],
                            "children": [
                              {
                                "id": "BTCPositionManagement",
                                "type": "container",
                                "subtype": "group",
                                "title": "BTC Position Management",
                                "highlight": "",
                                "showChildren": true,
                                "active": true,
                                "message": "Manage open BTC position",
                                "variables": [],
                                "conditions": [],
                                "actions": [],
                                "children": [
                                  {
                                    "id": "BTCStopLossManagement",
                                    "type": "container",
                                    "subtype": "if",
                                    "title": "BTC Stop Loss Management",
                                    "highlight": "",
                                    "showChildren": true,
                                    "active": true,
                                    "message": "Manage stop loss for BTC position",
                                    "variables": [],
                                    "conditions": [
                                      {
                                        "id": "BTCPriceAboveEntry",
                                        "type": "condition",
                                        "subtype": "priceCondition",
                                        "title": "if",
                                        "message": "Current BTC price is 2% above entry price",
                                        "active": true,
                                        "params": []
                                      }
                                    ],
                                    "actions": [
                                      {
                                        "id": "BTCUpdateStopLoss",
                                        "type": "action",
                                        "title": "action",
                                        "message": "Update stop loss to breakeven",
                                        "active": true,
                                        "params": [],
                                        "template": "updateStopLoss"
                                      }
                                    ],
                                    "children": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "ETHTradingStrategy",
                "type": "container",
                "subtype": "group",
                "title": "ETH Trading Strategy",
                "backgroundColor": "blue",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Ethereum",
                "variables": [
                  { "id": "ethAllocation", "name": "ETH Allocation", "type": "float", "value": 30, "description": "Percentage of portfolio allocated to ETH" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                  {
                    "id": "ETHTrendAnalysis",
                    "type": "container",
                    "subtype": "group",
                    "title": "ETH Trend Analysis",
                    "highlight": "",
                    "showChildren": true,
                    "active": true,
                    "message": "Analyze ETH market trend",
                    "variables": [],
                    "conditions": [
                      {
                        "id": "ETHBullishTrend",
                        "type": "condition",
                        "subtype": "technicalIndicatorCondition",
                        "title": "if",
                        "message": "ETH/USDT price is above 50-day EMA on 4H timeframe",
                        "active": true,
                        "params": []
                      }
                    ],
                    "actions": [],
                    "children": [
                      {
                        "id": "ETHEntryStrategy",
                        "type": "container",
                        "subtype": "group",
                        "title": "ETH Entry Strategy",
                        "highlight": "",
                        "showChildren": true,
                        "active": true,
                        "message": "Strategy for entering ETH positions",
                        "variables": [],
                        "conditions": [],
                        "actions": [],
                        "children": [
                          {
                            "id": "ETHBuySetup",
                            "type": "container",
                            "subtype": "if",
                            "title": "ETH Buy Setup",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Conditions for ETH buy entry",
                            "variables": [],
                            "conditions": [
                              {
                                "id": "ETHGoldenCross",
                                "type": "condition",
                                "subtype": "technicalIndicatorCondition",
                                "title": "if",
                                "message": "50-day EMA crosses above 200-day EMA on 1D timeframe for ETH/USDT",
                                "active": true,
                                "params": []
                              }
                            ],
                            "actions": [
                              {
                                "id": "ETHLongEntry",
                                "type": "action",
                                "title": "action",
                                "message": "Enter long position for ETH/USDT",
                                "active": true,
                                "params": [
                                  { "value": "0.75", "text": "0.75% of portfolio value", "color": "white", "type": "percentage", "unit": "%" }
                                ],
                                "template": "enterLongPosition"
                              }
                            ],
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "RiskManagement",
                "type": "container",
                "subtype": "group",
                "title": "Risk Management",
                "backgroundColor": "red",
                "textColor": "white",
                "highlight": "",
                "showChildren": true,
                "active": true,
                "message": "Overall risk management for the trading system",
                "variables": [
                  { "id": "maxDailyLoss", "name": "Max Daily Loss", "type": "float", "value": 3, "description": "Maximum allowed daily loss as percentage of portfolio" }
                ],
                "conditions": [
                  {
                    "id": "DailyLossCheck",
                    "type": "condition",
                    "subtype": "portfolioCondition",
                    "title": "if",
                    "message": "Daily loss exceeds {params[0]}% of portfolio value",
                    "active": true,
                    "params": [
                      { "value": "3", "text": "3%", "color": "red", "type": "percentage", "unit": "%" }
                    ]
                  }
                ],
                "actions": [
                  {
                    "id": "StopTrading",
                    "type": "action",
                    "title": "action",
                    "message": "Stop all trading activities for the day",
                    "active": true,
                    "params": [],
                    "template": "stopTrading"
                  },
                  {
                    "id": "NotifyUser",
                    "type": "action",
                    "title": "action",
                    "message": "Send notification to user about daily loss limit reached",
                    "active": true,
                    "params": [],
                    "template": "sendNotification"
                  }
                ],
                "children": []
              }
            ]
          }
        
    ];
    
export { defaultItems };