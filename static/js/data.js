let defaultItems = [
    {
        "id": "SY5ysCajjkeDKG4J0dzE8w",
        "type": "container",
        "subtype": "group",
        "title": "Group 1",
        "backgroundColor": "cornflowerblue",
        "textColor": "black",
        "showChildren": true,
        "active": true,
        "message": "test group",
        "variables": [],
        "conditions": [],
        "actions": [],
        "children": [
            {
                "id": "RtrIHskFIUu5GbcprUTYqA",
                "type": "container",
                "subtype": "if",
                "title": "IfCondition Level 0",
                "showChildren": true,
                "active": true,
                "message": "Setup the entire level by updating the Z height and Z elevation of most environment objects.",
                "variables": [
                    { "id": "d1d-OcTnaEira8poGNgCxA", "name": "x", "type": "integer", "value": 10, "description": "" },
                    { "id": "MW_CmR-7rUOKr_kTskiBBQ", "name": "y", "type": "integer", "value": -2, "description": "" },
                    { "id": "zO2pyIzLN0CKsYka0Dp0dg", "name": "target-symbol", "type": "symbol", "value": "BTC/USDT", "description": "test variable" }
                ],
                "conditions": [
                    {
                        "id": "WwBwoxYfR0OEbmAPtWkE2g",
                        "type": "condition",
                        "subtype": "priceConditionWithCandlestick",
                        "subtypeid": "8Pwc1k",
                        "title": "if",
                        "message": "{params[0]} {params[1]} {params[2]}{params[3]} of the {params[4]} within the last {params[5]} candlesticks",
                        "params": [
                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                            { "value": "high", "text": "Highest price", "color": "aqua", "type": "candlePrice", "unit": "" },
                            { "value": "inc-int", "text": "+ 100", "color": "white", "type": "addition", "unit": "" },
                            { "value": "4h", "text": "4 hour timeframe", "color": "aqua", "type": "timeframe", "unit": "" },
                            { "value": "20", "text": "20", "type": "candle", "color": "white", "unit": "" }
                        ],
                        "template": "priceCondition"
                    },
                    {
                        "id": "Qe4XPy7MrT0T1ZwD3V4Y6H",
                        "type": "condition",
                        "subtype": "priceCondition",
                        "subtypeid": "z3F2Gh",
                        "title": "or",
                        "message": "{params[0]} {params[1]} {params[2]}{params[3]}",
                        "params": [
                            { "value": "solusdt", "text": "SOL/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                            { "value": "lt", "text": "Less than", "color": "lawngreen", "type": "operator", "unit": "" },
                            { "value": "3000", "text": "3000", "color": "white", "type": "price", "unit": "$" },
                            { "value": "", "text": "", "color": "white", "type": "addition", "unit": "" }
                        ],
                        "template": "priceCondition"
                    },
                    {
                        "id": "1DjiFntJMkW5m5H7K42HgA",
                        "type": "condition",
                        "subtype": "balanceCondition",
                        "subtypeid": "k8L3Pm",
                        "title": "if",
                        "message": "{params[0]} balance is {params[1]} {params[2]}",
                        "params": [
                            { "value": "usdt", "text": "USDT", "color": "yellow", "type": "balanceSymbol", "unit": "" },
                            { "value": "gt", "text": "Greater than", "color": "lawngreen", "type": "operator", "unit": "" },
                            { "value": "1000", "text": "1000", "color": "white", "type": "price", "unit": "$" }
                        ],
                        "template": "balanceCondition"
                    },
                    {
                        "id": "TkUJdxawzEeFXOFOfyUtjA",
                        "type": "condition",
                        "subtype": "hasPositionCondition",
                        "subtypeid": "k8L3Pn",
                        "title": "if",
                        "message": "{params[0]} position is open",
                        "params": [
                            { "value": "solusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" }
                        ],
                        "template": "positionCondition"
                    }
                ],
                "actions": [
                    {
                        "id": "mgda6S8WT06a4vvRV4Xm3w",
                        "type": "action",
                        "title": "action",
                        "message": "{params[0]} {params[1]} {params[2]}",
                        "params": [
                            { "value": "long", "text": "LONG", "type": "side", "color": "aqua", "unit": "" },
                            { "value": "btcusdt", "text": "BTC/USDT", "color": "yellow", "type": "symbol", "unit": "" },
                            { "value": "500", "text": "500", "color": "white", "type": "amount", "unit": "$" }
                        ],
                        "template": "placeOrder"
                    }
                ],
                "children": [
                    {
                        "id": "Dz6RG8FqUUe2EBX2gtdb6A",
                        "type": "container",
                        "subtype": "if",
                        "title": "IfCondition Level 1",
                        "showChildren": true,
                        "active": true,
                        "message": "",
                        "variables": [
                            { "id": "1OsYLCv-xUym6SNMTBLCog", "name": "x", "type": "integer", "value": 10, "description": "" }
                        ],
                        "conditions": [
                            {
                                "id": "BQZSHU_IsUGE0ZyqGo2Mxg",
                                "type": "condition",
                                "title": "if",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "FROG", "type": "symbol", "unit": "" },
                                    { "value": "<=", "type": "operator", "unit": "" },
                                    { "value": "40000", "type": "price", "unit": "$" }
                                ],
                                "template": "priceCondition"
                            },
                            {
                                "id": "GgJ3YzKfA8e1rD6wP7Nz9L",
                                "type": "condition",
                                "title": "and",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "XRPUSDT", "type": "symbol", "unit": "" },
                                    { "value": ">", "type": "operator", "unit": "" },
                                    { "value": "0.75", "type": "price", "unit": "$" }
                                ],
                                "template": "priceCondition"
                            }
                        ],
                        "actions": [
                            {
                                "id": "nP7QgL0Zr9kT2vXcG8Vb3M",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "SELL", "type": "side", "unit": "" },
                                    { "value": "ETHUSDT", "type": "symbol", "unit": "" },
                                    { "value": "200", "type": "amount", "unit": "$" }
                                ],
                                "template": "placeOrder"
                            }
                        ],
                        "children": [
                            {
                                "id": "DkA9QKRewU2XtP9Dnb3OYo",
                                "type": "container",
                                "subtype": "if",
                                "title": "IfCondition Level 2",
                                "showChildren": true,
                                "active": true,
                                "message": "",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "wJX2CvC5U8KT3HdP9O3YlB",
                                        "type": "condition",
                                        "title": "if",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "BTC", "type": "symbol", "unit": "" },
                                            { "value": "<", "type": "operator", "unit": "" },
                                            { "value": "60000", "type": "price", "unit": "$" }
                                        ],
                                        "template": "priceCondition"
                                    },
                                    {
                                        "id": "FbZ7LCKHxU2Kn5W8bS9TcA",
                                        "type": "condition",
                                        "title": "or",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "ADA", "type": "symbol", "unit": "" },
                                            { "value": ">", "type": "operator", "unit": "" },
                                            { "value": "2.5", "type": "price", "unit": "$" }
                                        ],
                                        "template": "priceCondition"
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "xN8RqJ7U1vKT6UbP9W3LwM",
                                        "type": "action",
                                        "title": "action",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "BUY", "type": "side", "unit": "" },
                                            { "value": "BTCUSDT", "type": "symbol", "unit": "" },
                                            { "value": "100", "type": "amount", "unit": "$" }
                                        ],
                                        "template": "placeOrder"
                                    },
                                    {
                                        "id": "YNc9Xe4T5UkN7KcP1L9RaB",
                                        "type": "action",
                                        "title": "action",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "SELL", "type": "side", "unit": "" },
                                            { "value": "ADAUSDT", "type": "symbol", "unit": "" },
                                            { "value": "50", "type": "amount", "unit": "$" }
                                        ],
                                        "template": "placeOrder"
                                    }
                                ],
                                "children": [
                                    {
                                        "id": "Tj7KyN5XvK5M8NbP4R7TqW2",
                                        "type": "container",
                                        "subtype": "if",
                                        "title": "IfCondition Level 2",
                                        "showChildren": true,
                                        "active": true,
                                        "message": "",
                                        "variables": [],
                                        "conditions": [
                                            {
                                                "id": "hQX3R7yE6TZG9KwB3U5YbD2",
                                                "type": "condition",
                                                "title": "if",
                                                "message": "{params[0]} {params[1]} {params[2]}",
                                                "params": [
                                                    { "value": "ETH", "type": "symbol", "unit": "" },
                                                    { "value": "<", "type": "operator", "unit": "" },
                                                    { "value": "3000", "type": "price", "unit": "$" }
                                                ],
                                                "template": "priceCondition"
                                            },
                                            {
                                                "id": "aD4Qe1HF5GzI3LbV2O7PkA2",
                                                "type": "condition",
                                                "title": "and",
                                                "message": "{params[0]} {params[1]} {params[2]}",
                                                "params": [
                                                    { "value": "XMR", "type": "symbol", "unit": "" },
                                                    { "value": ">", "type": "operator", "unit": "" },
                                                    { "value": "250", "type": "price", "unit": "$" }
                                                ],
                                                "template": "priceCondition"
                                            }
                                        ],
                                        "actions": [
                                            {
                                                "id": "cQw4Ue6P5NzK3LbX1V9GhB2",
                                                "type": "action",
                                                "title": "action",
                                                "message": "{params[0]} {params[1]} {params[2]}",
                                                "params": [
                                                    { "value": "SELL", "type": "side", "unit": "" },
                                                    { "value": "XMRUSDT", "type": "symbol", "unit": "" },
                                                    { "value": "30", "type": "amount", "unit": "$" }
                                                ],
                                                "template": "placeOrder"
                                            }
                                        ],
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "id": "Tj7KyN5XvK5M8NbP4R7TqW",
                                "type": "container",
                                "subtype": "if",
                                "title": "IfCondition Level 2",
                                "showChildren": true,
                                "active": true,
                                "message": "",
                                "variables": [],
                                "conditions": [
                                    {
                                        "id": "hQX3R7yE6TZG9KwB3U5YbD",
                                        "type": "condition",
                                        "title": "if",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "ETH", "type": "symbol", "unit": "" },
                                            { "value": "<", "type": "operator", "unit": "" },
                                            { "value": "3000", "type": "price", "unit": "$" }
                                        ],
                                        "template": "priceCondition"
                                    },
                                    {
                                        "id": "aD4Qe1HF5GzI3LbV2O7PkA",
                                        "type": "condition",
                                        "title": "and",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "XMR", "type": "symbol", "unit": "" },
                                            { "value": ">", "type": "operator", "unit": "" },
                                            { "value": "250", "type": "price", "unit": "$" }
                                        ],
                                        "template": "priceCondition"
                                    }
                                ],
                                "actions": [
                                    {
                                        "id": "cQw4Ue6P5NzK3LbX1V9GhB",
                                        "type": "action",
                                        "title": "action",
                                        "message": "{params[0]} {params[1]} {params[2]}",
                                        "params": [
                                            { "value": "SELL", "type": "side", "unit": "" },
                                            { "value": "XMRUSDT", "type": "symbol", "unit": "" },
                                            { "value": "30", "type": "amount", "unit": "$" }
                                        ],
                                        "template": "placeOrder"
                                    }
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "Vz8QdL5WwV9N5TbP2L4NhA",
                        "type": "container",
                        "subtype": "if",
                        "title": "IfCondition Level 1 - Alternative",
                        "showChildren": true,
                        "active": true,
                        "message": "",
                        "variables": [
                            { "id": "3KzN2CtXwWYm8MbX3Lp3fC", "name": "b", "type": "integer", "value": 8, "description": "" }
                        ],
                        "conditions": [
                            {
                                "id": "vRy5X3lP8WbL7NpF3O9UdE",
                                "type": "condition",
                                "title": "if",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "LTC", "type": "symbol", "unit": "" },
                                    { "value": "<", "type": "operator", "unit": "" },
                                    { "value": "150", "type": "price", "unit": "$" }
                                ],
                                "template": "priceCondition"
                            },
                            {
                                "id": "xWk8Z4nS6YhN9LbR4V2FgG",
                                "type": "condition",
                                "title": "and",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "DOGE", "type": "symbol", "unit": "" },
                                    { "value": ">", "type": "operator", "unit": "" },
                                    { "value": "0.2", "type": "price", "unit": "$" }
                                ],
                                "template": "priceCondition"
                            }
                        ],
                        "actions": [
                            {
                                "id": "mLx7Uq5P7NbK6QvW4V1FgC",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "BUY", "type": "side", "unit": "" },
                                    { "value": "LTCUSDT", "type": "symbol", "unit": "" },
                                    { "value": "100", "type": "amount", "unit": "$" }
                                ],
                                "template": "placeOrder"
                            }
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "QvP3Yk7W9LwM8TbX2N5TnA",
                "type": "container",
                "subtype": "if",
                "title": "IfCondition Level 0 - Second Container",
                "showChildren": true,
                "active": true,
                "message": "Second container with nested conditions",
                "variables": [
                    { "id": "4LpR3CmXwWYm9NbX4Lq4gD", "name": "c", "type": "integer", "value": 10, "description": "" }
                ],
                "conditions": [
                    {
                        "id": "wKp9X3mP9XkN7QvP5V3UhF",
                        "type": "condition",
                        "title": "if",
                        "message": "{params[0]} {params[1]} {params[2]}",
                        "params": [
                            { "value": "SOL", "type": "symbol", "unit": "" },
                            { "value": "<", "type": "operator", "unit": "" },
                            { "value": "100", "type": "price", "unit": "$" }
                        ],
                        "template": "priceCondition"
                    }
                ],
                "actions": [
                    {
                        "id": "cRk8Uo6R8VnK9SwR6V5HgE",
                        "type": "action",
                        "title": "action",
                        "message": "{params[0]} {params[1]} {params[2]}",
                        "params": [
                            { "value": "SELL", "type": "side", "unit": "" },
                            { "value": "SOLUSDT", "type": "symbol", "unit": "" },
                            { "value": "50", "type": "amount", "unit": "$" }
                        ],
                        "template": "placeOrder"
                    }
                ],
                "children": [
                    {
                        "id": "xLz9X7nP9WvN8TbV3O7UhG",
                        "type": "container",
                        "subtype": "if",
                        "title": "IfCondition Level 1 - Nested",
                        "showChildren": true,
                        "active": true,
                        "message": "",
                        "variables": [
                            { "id": "5MnR4DnXxWYm0OqY5Mp5hF", "name": "d", "type": "integer", "value": 20, "description": "" }
                        ],
                        "conditions": [
                            {
                                "id": "yPz0X3pP0YnN0RwX6V2UkH",
                                "type": "condition",
                                "title": "if",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "BNB", "type": "symbol", "unit": "" },
                                    { "value": ">", "type": "operator", "unit": "" },
                                    { "value": "400", "type": "price", "unit": "$" }
                                ],
                                "template": "priceCondition"
                            },
                            {
                                "id": "xNw0Qn8S0ZkO1TnX7V3UpI",
                                "type": "condition",
                                "title": "and",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "XRP", "type": "symbol", "unit": "" },
                                    { "value": "<", "type": "operator", "unit": "" },
                                    { "value": "1", "type": "price", "unit": "$" }
                                ],
                                "template": "priceCondition"
                            }
                        ],
                        "actions": [
                            {
                                "id": "cLk9Wp6Q9ZnK0UxX8V6HiF",
                                "type": "action",
                                "title": "action",
                                "message": "{params[0]} {params[1]} {params[2]}",
                                "params": [
                                    { "value": "BUY", "type": "side", "unit": "" },
                                    { "value": "BNBUSDT", "type": "symbol", "unit": "" },
                                    { "value": "150", "type": "amount", "unit": "$" }
                                ],
                                "template": "placeOrder"
                            }
                        ],
                        "children": []
                    }
                ]
            }
        ]
    }
    
]


export { defaultItems };
