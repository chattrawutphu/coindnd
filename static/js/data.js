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
        "id": "var-001",
        "type": "container",
        "subtype": "message",
        "message": "Maximum number of open positions allowed",
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
        "showChildren": false,
        "active": true,
        "message": "Overall trading strategy for multiple cryptocurrencies",
        "variables": [
            { "id": "gui-002", "name": "Global Risk Level", "type": "integer", "value": 3, "description": "Risk level from 1 (low) to 5 (high)" },
            { "id": "gui-003", "name": "Max Open Positions", "type": "integer", "value": 5, "description": "Maximum number of open positions allowed" }
        ],
        "conditions": [],
        "actions": [],
        "children": [
            {
                "id": "gui-004",
                "type": "container",
                "subtype": "group",
                "title": "BTC Trading Strategy",
                "backgroundColor": "orange",
                "textColor": "black",
                "highlight": "red",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Bitcoin",
                "variables": [
                    { "id": "gui-005", "name": "BTC Stop Loss %", "type": "float", "value": 2.5, "description": "Stop loss percentage for BTC trades" },
                    { "id": "gui-006", "name": "BTC Take Profit %", "type": "float", "value": 5.0, "description": "Take profit percentage for BTC trades" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "gui-007",
                        "type": "container",
                        "subtype": "if",
                        "title": "BTC Entry Condition",
                        "highlight": "blue",
                        "showChildren": true,
                        "active": true,
                        "message": "Conditions for entering a BTC trade",
                        "variables": [],
                        "conditions": [
                            {
                                "id": "gui-008",
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
                                "id": "gui-009",
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
                                "id": "gui-010",
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
                                "id": "gui-011",
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
                                "id": "gui-012",
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
                        "id": "gui-013",
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
                                "id": "gui-014",
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
                                "id": "gui-015",
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
                                "id": "gui-016",
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
                    },                    {
                        "id": "gui-013a",
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
                                "id": "gui-014",
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
                                "id": "gui-015",
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
                                "id": "gui-016",
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
                "id": "gui-017",
                "type": "container",
                "subtype": "group",
                "title": "ETH Trading Strategy",
                "backgroundColor": "purple",
                "textColor": "white",
                "highlight": "black",
                "showChildren": true,
                "active": true,
                "message": "Trading strategy specific to Ethereum",
                "variables": [
                    { "id": "gui-018", "name": "ETH Stop Loss %", "type": "float", "value": 3.0, "description": "Stop loss percentage for ETH trades" },
                    { "id": "gui-019", "name": "ETH Take Profit %", "type": "float", "value": 6.0, "description": "Take profit percentage for ETH trades" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "gui-020",
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
                                "id": "gui-021",
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
                                "id": "gui-022",
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
                                "id": "gui-023",
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
                                "id": "gui-024",
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
        ]
    },
    /*{
        "id": "gui-025",
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
                { "id": "gui-026", "name": "Global Risk Level", "type": "integer", "value": 3, "description": "Risk level from 1 (low) to 5 (high)" },
                { "id": "gui-027", "name": "Max Open Positions", "type": "integer", "value": 5, "description": "Maximum number of open positions allowed" }
            ],
            "conditions": [],
            "actions": [],
            "children": [
                {
                    "id": "gui-028",
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
                        { "id": "gui-029", "name": "BTC Stop Loss %", "type": "float", "value": 2.5, "description": "Stop loss percentage for BTC trades" },
                        { "id": "gui-030", "name": "BTC Take Profit %", "type": "float", "value": 5.0, "description": "Take profit percentage for BTC trades" }
                    ],
                    "conditions": [],
                    "actions": [],
                    "children": [
                        {
                            "id": "gui-031",
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
                                    "id": "gui-032",
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
                                    "id": "gui-033",
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
                                    "id": "gui-034",
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
                                    "id": "gui-035",
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
                                            "id": "gui-036",
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
                                            "id": "gui-037",
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
                            "id": "gui-038",
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
                                    "id": "gui-039",
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
                                    "id": "gui-040",
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
                    "id": "gui-041",
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
                            "id": "gui-042",
                            "type": "container",
                            "subtype": "group",
                            "title": "ETH Trading Strategy",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Trading strategy for Ethereum",
                            "variables": [
                                { "id": "gui-043", "name": "ETH Stop Loss %", "type": "float", "value": 3.0, "description": "Stop loss percentage for ETH trades" }
                            ],
                            "conditions": [],
                            "actions": [],
                            "children": [
                                {
                                    "id": "gui-044",
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
                                            "id": "gui-045",
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
                                            "id": "gui-046",
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
                            "id": "gui-047",
                            "type": "container",
                            "subtype": "group",
                            "title": "SOL Trading Strategy",
                            "highlight": "",
                            "showChildren": true,
                            "active": true,
                            "message": "Trading strategy for Solana",
                            "variables": [
                                { "id": "gui-048", "name": "SOL Stop Loss %", "type": "float", "value": 4.0, "description": "Stop loss percentage for SOL trades" }
                            ],
                            "conditions": [],
                            "actions": [],
                            "children": [
                                {
                                    "id": "gui-049",
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
                                            "id": "gui-050",
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
                                            "id": "gui-051",
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
                "id": "gui-052",
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
                    { "id": "gui-053", "name": "Max Daily Loss", "type": "float", "value": 5.0, "description": "Maximum allowed daily loss percentage" },
                    { "id": "gui-054", "name": "Max Weekly Loss", "type": "float", "value": 15.0, "description": "Maximum allowed weekly loss percentage" }
                ],
                "conditions": [],
                "actions": [],
                "children": [
                    {
                        "id": "gui-055",
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
                                "id": "gui-056",
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
                                "id": "gui-057",
                                "type": "action",
                                "title": "action",
                                "message": "Close all open positions",
                                "active": true,
                                "params": [],
                                "template": "closeAllPositions"
                            },
                            {
                                "id": "gui-058",
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
                        "id": "gui-059",
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
                                "id": "gui-060",
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
                                "id": "gui-061",
                                "type": "action",
                                "title": "action",
                                "message": "Close all open positions",
                                "active": true,
                                "params": [],
                                "template": "closeAllPositions"
                            },
                            {
                                "id": "gui-062",
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
            }
        ]
    }*/
];

export { defaultItems };