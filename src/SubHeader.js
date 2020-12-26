import React from 'react'
import './SubHeader.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategoriesAsync } from './features/categorySlice';
function SubHeader() {
    const categories = useSelector(state => state.category.categories)
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchCategoriesAsync({}))

    }, [dispatch])

    const renderCategories = (categories) => {
        let newCategoryList = []
        for (let cat of categories) {
            if (cat.children.length === 0) {
                newCategoryList.push(
                    <li key={cat.name}>
                        {
                            cat.parentId ? <a href={cat.slug}> {cat.name} </a> : <span>
                                {cat.name}
                            </span>
                        }

                    </li>)
            } else {
                newCategoryList.push(

                    <li key={cat.name}> {
                        cat.parentId ? <a href={cat.slug}> {cat.name} </a> : <span>
                            {cat.name}
                        </span>
                    }
                        <ul>
                            {renderCategories(cat.children)}
                        </ul>
                    </li>

                )
            }
        }
        return newCategoryList;

    }

    return (
        <div className='subHeader'>
            <ul>
                {categories.length > 0 ? renderCategories(categories) : null}
            </ul>
        </div>
    )
}

export default SubHeader
