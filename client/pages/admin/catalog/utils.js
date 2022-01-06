import {displayName} from "../../../helpers";
import {omit} from "../../../helpers";

export function findInCategoryTreeById(tree, value) {

    console.log(tree, value)
    let returnData = [];
    let findSiblings = (category, siblings) => {
        if (category.id === value) {
            returnData = {
                category: category,
                siblings: siblings.filter(sibling => sibling.id !== value)
            }
        } else {
            if (siblings) {
                category.children.forEach(child => {
                    findSiblings(child, category.children);
                });
            } else {
                category.forEach(child => {
                    findSiblings(child, category);
                });
            }
        }
    };

    findSiblings(tree);

    return returnData;
}


const defaultFilter = {
    displayName: "",
    description: "",
    code: "",
    parentCode: "",
    categoryLevel: "",
    active: "",
    root: "",
    concrete: ""
};


export function filterTree(tree, filter) {
    let hasFilterValue = false;

    Object.keys(defaultFilter).forEach(key => {
        if (filter[key] !== defaultFilter[key]) {
            hasFilterValue = true
        }
    });

    if (!hasFilterValue) return tree;



    let rFilter = category => {
        let childrens = category.children.map(rFilter).filter(c => c);
        let matched = true;
        if (filter.active !== defaultFilter.active) {
            let activeFilter = filter.active === "true";
            matched = matched && category.active === activeFilter;
        }
        if (matched && filter.root !== defaultFilter.root) {
            let rootFilter = filter.root === "true";
            matched = category.root === rootFilter;
        }
        if (matched && filter.concrete !== defaultFilter.concrete) {
            let rootFilter = filter.concrete === "true";
            matched = matched && category.concrete === rootFilter;
        }
        if (matched && filter.displayName !== defaultFilter.displayName) {
            matched = displayName(category.displayName).toLowerCase().includes(filter.displayName.toLowerCase());
        }
        if (matched && filter.description !== defaultFilter.description) {
            matched = category.description.toLowerCase().includes(filter.description.toLowerCase());
        }

        if (category && filter.code !== defaultFilter.code ) {
            matched = category.code.toLowerCase().includes(filter.code.toLowerCase());
        }

        if (matched && filter.parentCode !== defaultFilter.parentCode) {
            matched = String(category.parentCode).toLowerCase().includes(filter.parentCode.toLowerCase());
        }

        if (matched && filter.categoryLevel !== defaultFilter.categoryLevel) {
            matched = category.categoryLevel == filter.categoryLevel;
        }

        if (matched || childrens.length) {
            return {
                ...category,
                children: childrens,
                filterMatched: matched,
                filterTime: Date.now()
            };
        }
        return null;
    };
    return tree.map(rFilter).filter(c => c);
}
