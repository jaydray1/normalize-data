import "./styles.css";
import { normalize, schema } from "normalizr";
import * as React from "react";
import { omit, sortBy } from "lodash";

const skuGroups = [
  {
    skuGroupId: 4312,
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
          },
          // added here to test properties reduction
          {
            name: "Finish",
            value: "Yellow",
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
    skuGroupId: 4310,
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
    skuGroupId: 4311,
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
      const newProperties = curr.properties.reduce((acc, curr) => {
        return { ...acc, [curr.name]: { ...curr } };
      }, {});
      return {
        ...acc,
        [curr.skuId]: { ...curr, properties: { ...newProperties } }
      };
    }, {});

    // const newSkuProperties = newSkus.reduce((acc, curr) => {
    //   return { ...acc, [curr.properties.name]: { ...curr.properties }}
    // }, {})

    // const newSkuProperties = curr.skus.properties.reduce((acc, curr) => {
    //   return { ...acc, [curr.name]: { ...curr } }
    // }, {})

    return { ...acc, [curr.skuGroupId]: { ...curr, skus: { ...newSkus } } };
  }, {});

  return normal;
};

const skuGroupSort = (arr) => {
  const thisList = arr.reduce((acc, curr) => {
    return [...acc, curr.skuGroupId].sort((a, b) => a - b);
  }, []);
  return thisList;
};

const addNewSkuGroup = (normalObject, sortArray) => {
  console.log(normalObject);
  const newId = sortArray.at(-1) + 1;
  normalObject[newId] = { skus: [{}] };
  return normalObject;
};

const deleteSkuGroup = (newObj, deletedId) => {
  const newSkuWithDeleted = omit(newObj, [deletedId]);
  return newSkuWithDeleted;
};

export default function App() {
  const [normalizedSkuObject, setNormalizedSkuObject] = React.useState();
  const [listSorted, setListSorted] = React.useState();
  const [fresh, setFresh] = React.useState();

  React.useEffect(() => {
    setNormalizedSkuObject(normalizeSkuGroups(skuGroups));
    setListSorted(skuGroupSort(skuGroups));
    console.log(
      addNewSkuGroup(normalizeSkuGroups(skuGroups), skuGroupSort(skuGroups))
    );
    // console.log(deleteSkuGroup(normalizeSkuGroups(skuGroups), 4312));
  }, []);

  React.useEffect(() => {
    if (normalizedSkuObject) {
      const toReturn = sortBy(Object.values(normalizedSkuObject), (item) =>
        listSorted.indexOf(item.skuGroupId)
      );
      setFresh(toReturn);
    }
  }, [normalizedSkuObject, listSorted]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h1>
        {normalizedSkuObject && normalizedSkuObject["4310"].skus["28941"].skuId}
      </h1>
      <div>
        {fresh &&
          fresh.map((item) => <p key={item.skuGroupId}>{item.skuGroupId}</p>)}
      </div>
    </div>
  );
}
