let defaultItems = [
    {
        id: "RtrIHskFIUu5GbcprUTYqA",
        type: "container",
        subtype: "if",
        title: "IfCondition Level 0",
        showChildren: true,
        message: "",
        variables: [
            {name: "x", type: "integer", value:10, description: ""},
            {name: "y", type: "integer", value:-2, description: ""},
            {name: "target-symbol", type: "sytmbol", value:"BTC/USDT", description: ""}
        ],
        conditions: [
            {
                id: "WwBwoxYfR0OEbmAPtWkE2g",
                type: "condition",
                subtype: "priceConditionWithCandlestick",
                subtypeid: "8Pwc1k",
                title: "if",
                message: "{params[0]} {params[1]} {params[2]}{params[3]} of the {params[4]} within the last {params[5]} candlesticks",
                params: [
                    { value: "btcusdt", text:"BTC/USDT", color:"yellow", type: "symbol", unit: "" },
                    { value: "gt",text:"Greater than", color:"lawngreen", type: "operator", unit: "" },
                    { value: "high",text:"Highest price", color:"aqua", type: "candlePrice", unit: "" },
                    { value: "inc-int",text:"+ 100", color:"white", type: "addition", unit: "" },
                    { value: "4h",text:"4 hour timeframe", color:"aqua", type: "timeframe", unit: "" },
                    { value: "20",text:"20", type: "candle", color:"white", unit: "" },
                ],
            },
            {
                id: "Qe4XPy7MrT0T1ZwD3V4Y6H",
                type: "condition",
                subtype: "priceCondition",
                subtypeid: "z3F2Gh",
                title: "or",
                message: "{params[0]} {params[1]} {params[2]}{params[3]}",
                params: [
                    { value: "solusdt", text:"SOL/USDT", color:"yellow", type: "symbol", unit: "" },
                    { value: "lt",text:"Less than", color:"lawngreen", type: "operator", unit: "" },
                    { value: "3000",text:"3000", color:"white", type: "price", unit: "$" },
                    { value: "",text:"", color:"white", type: "addition", unit: "" },
                    //{ value: "inc-int",text:"+ 100", color:"white", type: "addition", unit: "" },
                ],
            },
            {
                id: "1DjiFntJMkW5m5H7K42HgA",
                type: "condition",
                subtype: "balanceCondition",
                subtypeid: "k8L3Pm",
                title: "if",
                message: "{params[0]} balance is {params[1]} {params[2]}",
                params: [
                    { value: "usdt", text:"USDT", color:"yellow", type: "balanceSymbol", unit: "" },
                    { value: "gt",text:"Greater than", color:"lawngreen", type: "operator", unit: "" },
                    { value: "1000",text:"1000", color:"white", type: "price", unit: "$" },
                ],
            },
            {
                id: "TkUJdxawzEeFXOFOfyUtjA",
                type: "condition",
                subtype: "hasPositionCondition",
                subtypeid: "k8L3Pn",
                title: "if",
                message: "{params[0]} position is open",
                params: [
                    { value: "solusdt", text:"BTC/USDT", color:"yellow", type: "symbol", unit: "" },
                ],
            }
        ],
        actions: [
            {
                id: "mgda6S8WT06a4vvRV4Xm3w",
                type: "action",
                title: "action",
                message: "{params[0]} {params[1]} {params[2]}",
                params: [
                    { value: "LONG", type: "side", unit: "" },
                    { value: "BTCUSDT", type: "symbol", unit: "" },
                    { value: "500", type: "amount", unit: "$" }
                ],
                template: "placeOrder" // Updated template field
            }
        ],
        children: [
            {
                id: "Dz6RG8FqUUe2EBX2gtdb6A",
                type: "container",
                subtype: "if",
                title: "IfCondition Level 1",
                showChildren: true,
                message: "Test comment for dev!",
                conditions: [
                    {
                        id: "BQZSHU_IsUGE0ZyqGo2Mxg",
                        type: "condition",
                        title: "if",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "FROG", type: "symbol", unit: "" },
                            { value: "<=", type: "operator", unit: "" },
                            { value: "40000", type: "price", unit: "$" }
                        ],
                        template: "priceCondition" // Added template field
                    },
                    {
                        id: "GgJ3YzKfA8e1rD6wP7Nz9L",
                        type: "condition",
                        title: "and",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "XRPUSDT", type: "symbol", unit: "" },
                            { value: ">", type: "operator", unit: "" },
                            { value: "0.75", type: "price", unit: "$" }
                        ],
                        template: "priceCondition" // Added template field
                    }
                ],
                actions: [
                    {
                        id: "nP7QgL0Zr9kT2vXcG8Vb3M",
                        type: "action",
                        title: "action",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "SELL", type: "side", unit: "" },
                            { value: "ETHUSDT", type: "symbol", unit: "" },
                            { value: "200", type: "amount", unit: "$" }
                        ],
                        template: "placeOrder" // Updated template field
                    }
                ],
                children: [
                    {
                        id: "DkA9QKRewU2XtP9Dnb3OYo",
                        type: "container",
                        subtype: "if",
                        title: "IfCondition Level 2A",
                        showChildren: true,
                        message: "Test comment for dev!",
                        conditions: [
                            {
                                id: "FZQXLU_Hf3je0aOxlKxQqE",
                                type: "condition",
                                title: "if",
                                message: "{params[0]} {params[1]} {params[2]}",
                                params: [
                                    { value: "LTCUSDT", type: "symbol", unit: "" },
                                    { value: ">", type: "operator", unit: "" },
                                    { value: "200", type: "price", unit: "$" }
                                ],
                                template: "priceCondition" // Added template field
                            },
                            {
                                id: "D8v4KJ0Hq1O6fB9R0S2Y6F",
                                type: "condition",
                                title: "or",
                                message: "{params[0]} {params[1]} {params[2]}",
                                params: [
                                    { value: "BNBUSDT", type: "symbol", unit: "" },
                                    { value: "<=", type: "operator", unit: "" },
                                    { value: "300", type: "price", unit: "$" }
                                ],
                                template: "priceCondition" // Added template field
                            }
                        ],
                        actions: [],
                        children: [
                            {
                                id: "NsP8JbGhlgq23dXb9rTNs0",
                                type: "container",
                                subtype: "if",
                                title: "IfCondition Level 3A",
                                showChildren: true,
                                message: "Test comment for dev!",
                                conditions: [
                                    {
                                        id: "dA9bHdGhxYT2xFaHPSe2Al",
                                        type: "condition",
                                        title: "if",
                                        message: "{params[0]} {params[1]} {params[2]}",
                                        params: [
                                            { value: "ADAUSDT", type: "symbol", unit: "" },
                                            { value: ">=", type: "operator", unit: "" },
                                            { value: "1", type: "price", unit: "$" }
                                        ],
                                        template: "priceCondition" // Added template field
                                    },
                                    {
                                        id: "eF5y0K6Bq8P3jL9M0Q3N7X",
                                        type: "condition",
                                        title: "and",
                                        message: "{params[0]} {params[1]} {params[2]}",
                                        params: [
                                            { value: "SOLUSDT", type: "symbol", unit: "" },
                                            { value: "<", type: "operator", unit: "" },
                                            { value: "20", type: "price", unit: "$" }
                                        ],
                                        template: "priceCondition" // Added template field
                                    }
                                ],
                                actions: [
                                    {
                                        id: "RjK2H8L5t3A7wM0F9Vb4E",
                                        type: "action",
                                        title: "action",
                                        message: "{params[0]} {params[1]} {params[2]}",
                                        params: [
                                            { value: "BUY", type: "side", unit: "" },
                                            { value: "ADAUSDT", type: "symbol", unit: "" },
                                            { value: "300", type: "amount", unit: "$" }
                                        ],
                                        template: "placeOrder" // Updated template field
                                    }
                                ],
                                children: []
                            },
                            {
                                id: "OqM5ZwR4b9T7kG6L8F1J1Y",
                                type: "container",
                                subtype: "else",
                                title: "ElseCondition Level 3B",
                                showChildren: true,
                                message: "Test comment for dev!",
                                conditions: [],
                                actions: [],
                                children: []
                            }
                        ]
                    },
                    {
                        id: "PcV9N2QmW5L6rS8X0D3Z8",
                        type: "container",
                        subtype: "else",
                        title: "ElseCondition Level 2B",
                        showChildren: true,
                        message: "Test comment for dev!",
                        conditions: [],
                        actions: [],
                        children: []
                    }
                ]
            },
            {
                id: "Dz6RG8FqUUe2EBX2gtdb6A2",
                type: "container",
                subtype: "else",
                title: "ElseCondition Level 1",
                showChildren: true,
                message: "Test comment for dev!",
                conditions: [
                    {
                        id: "Jp8A9QxE0V2kR6YcT4Xb1",
                        type: "condition",
                        title: "if",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "DOGEUSDT", type: "symbol", unit: "" },
                            { value: "<", type: "operator", unit: "" },
                            { value: "0.10", type: "price", unit: "$" }
                        ],
                        template: "priceCondition" // Added template field
                    }
                ],
                actions: [
                    {
                        id: "R6T8W2FqP9mJ5oK7L4Zx2",
                        type: "action",
                        title: "action",
                        message: "{params[0]} {params[1]} {params[2]}",
                        params: [
                            { value: "SHORT", type: "side", unit: "" },
                            { value: "DOGEUSDT", type: "symbol", unit: "" },
                            { value: "100", type: "amount", unit: "$" }
                        ],
                        template: "placeOrder" // Updated template field
                    }
                ],
                children: []
            }
        ]
    }
];

export { defaultItems };
