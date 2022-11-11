import React from 'react';
import {Search} from "./Search/Search";
import {ShowCards} from "./ShowCards/ShowCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";
import {ResetFilter} from "./ResetFilter/ResetFilter";
import {useAppSelector} from '../../common/hook/hook';


export const Settings = () => {

    const {pageCount, page, packName, min, max, user_id, sortPacks} = useAppSelector(state => state.packs)

    return (
        <div style={{display: "flex", justifyContent:'space-between' ,flexWrap:'wrap'}}>
            <Search page={page} pageCount={pageCount} packName={packName} min={min} max={max} user_id={user_id} sortPacks={sortPacks}/>
            <ShowCards page={page} pageCount={pageCount} packName={packName} min={min} max={max} user_id={user_id} sortPacks={sortPacks}/>
            <NumberOfCards  page={page} pageCount={pageCount} packName={packName} min={min} max={max} user_id={user_id} sortPacks={sortPacks}/>
            <ResetFilter/>
        </div>
    );
};
