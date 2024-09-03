let items = [
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
                "children": []
            }
        ]
    }
    
]


export { items };
