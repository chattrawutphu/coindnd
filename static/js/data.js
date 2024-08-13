// Initial `defaultItems`
let defaultItems = [
    {
        id: "RtrIHskFIUu5GbcprUTYqA",
        type: "container",
        subtype: "if",
        title: "IfCondition",
        showChildren: true,
        message: "",
        conditions: [
            {
                id: "WwBwoxYfR0OEbmAPtWkE2g",
                type: "condition",
                title: "PriceCondition",
                message: "{params[0]} {params[1]} {params[2]}",
                params: [
                    { value: "BTCUSDT", type: "symbol", unit: "" },
                    { value: "<=", type: "operator", unit: "" },
                    { value: "40000", type: "price", unit: "$" }
                ]
            },
            {
                id: "eRwWPP-o80yVeskQDGjdHg",
                type: "condition",
                title: "PriceCondition",
                message: "{params[0]} {params[1]} {params[2]}",
                params: [
                    { value: "DOGEUSDT", type: "symbol", unit: "" },
                    { value: "<=", type: "operator", unit: "" },
                    { value: "0.05", type: "price", unit: "$" }
                ]
            }
        ],
        actions: [
            {
                id: "mgda6S8WT06a4vvRV4Xm3w",
                type: "action",
                title: "PriceAction",
                message: "{params[0]} {params[1]} {params[2]}",
                params: [
                    { value: "LONG", type: "side", unit: "" },
                    { value: "BTCUSDT", type: "symbol", unit: "" },
                    { value: "500", type: "amount", unit: "$" }
                ]
            }
        ],
        children: [
            {
                id: "Dz6RG8FqUUe2EBX2gtdb6A",
                type: "container",
                subtype: "if",
                title: "IfCondition",
                showChildren: true,
                message: "Test comment for dev!",
                conditions: [],
                actions: []
            }
        ]
    },
    {
        id: "OEeTI99x_Eyjg4318WNbkQ",
        type: "container",
        subtype: "else",
        title: "ElseCondition",
        showChildren: true,
        message: "Test comment for dev!",
        conditions: [],
        actions: []
    }
];

export { defaultItems };
