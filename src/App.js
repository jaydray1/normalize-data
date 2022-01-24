import "./styles.css";
import { normalize, schema } from "normalizr";
import React from "react";

const skuGroups = [
  {
    skuGroupId: 4310,
    productId: 4347,
    skuIds: [28938, 28939, 28940],
    skus: [
      {
        skuId: 28938,
        properties: [
          {
            name: "Color",
            value: "Red",
            type: "Static"
          }
        ],
        tags: [],
        code: "reddd",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuImages: [],
        skuInventories: null
      },
      {
        skuId: 28939,
        properties: [
          {
            name: "Color",
            value: "Orange",
            type: "Static"
          }
        ],
        tags: [],
        code: "orrr",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuImages: [],
        skuInventories: null
      },
      {
        skuId: 28940,
        properties: [
          {
            name: "Color",
            value: "Yellow",
            type: "Static"
          }
        ],
        tags: [],
        code: "yeee",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuImages: [],
        skuInventories: null
      }
    ],
    name: "Product Options",
    options: [
      {
        optionName: "Color",
        values: ["Red", "Orange", "Yellow"],
        associatedImageIds: {},
        customTextCharacterLimit: 0,
        isCustomText: false
      }
    ]
  },
  {
    skuGroupId: 4311,
    productId: 4347,
    skuIds: [28941, 28942],
    skus: [
      {
        skuId: 28941,
        properties: [
          {
            name: "Design",
            value: "Bold",
            type: "Static"
          }
        ],
        tags: [],
        code: "bld",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuImages: [],
        skuInventories: null
      },
      {
        skuId: 28942,
        properties: [
          {
            name: "Design",
            value: "Cliche",
            type: "Static"
          }
        ],
        tags: [],
        code: "clch",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuImages: [],
        skuInventories: null
      }
    ],
    name: "Design",
    options: [
      {
        optionName: "Design",
        values: ["Bold", "Cliche"],
        associatedImageIds: {},
        customTextCharacterLimit: 0,
        isCustomText: false
      }
    ]
  },
  {
    skuGroupId: 4312,
    productId: 4347,
    skuIds: [28943, 28944, 28945],
    skus: [
      {
        skuId: 28943,
        properties: [
          {
            name: "Finish",
            value: "Matte",
            type: "Static"
          }
        ],
        tags: [],
        code: "moo",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuInventories: null,
        skuImages: []
      },
      {
        skuId: 28944,
        properties: [
          {
            name: "Finish",
            value: "Glossy",
            type: "Static"
          }
        ],
        tags: [],
        code: "goo",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuInventories: null,
        skuImages: []
      },
      {
        skuId: 28945,
        properties: [
          {
            name: "Finish",
            value: "W E T",
            type: "Static"
          }
        ],
        tags: [],
        code: "woo",
        sellerId: 0,
        price: 0.0,
        comparisonPrice: 0.0,
        weight: 0.0,
        weightUnit: null,
        isActive: false,
        createdDate: "2021-10-25T14:55:11.354419+00:00",
        skuInventories: null,
        skuImages: []
      }
    ],
    name: "Finish",
    options: [
      {
        optionName: "Finish",
        values: ["Matte", "Glossy", "W E T"],
        associatedImageIds: {},
        customTextCharacterLimit: 0,
        isCustomText: false
      }
    ]
  }
];

// skuGroupsById
// skusById
// skuGroupIds

const normalizeSkuGroups = (arr) => {
  const normal = arr.reduce((acc, curr) => {
    const newSkus = curr.skus.reduce((acc, curr) => {
      return { ...acc, [curr.skuId]: { ...curr } };
    }, {});

    return { ...acc, [curr.skuGroupId]: { ...curr, skus: { ...newSkus } } };
  }, {});
  return normal;
};

const skuGroupSort = (arr) => {
  const thisList = arr.reduce((acc, curr) => {
    return [...acc, curr.skuGroupId];
  }, []);
  return thisList;
};

const addNewSkuGroup = (normalObject, sortArray) => {
  console.log(normalObject);
  const newId = sortArray.at(-1) + 1;
  normalObject[newId] = { skus: [{}] };
  return normalObject;
};

export default function App() {
  React.useEffect(() => {
    console.log(normalizeSkuGroups(skuGroups));
    console.log(skuGroupSort(skuGroups));
    console.log(
      addNewSkuGroup(normalizeSkuGroups(skuGroups), skuGroupSort(skuGroups))
    );
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
