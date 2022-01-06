/**
 * Created by Administrator on 3/27/2019.
 */

import api from "../../../api";

export default function onFetchData(state){
    if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
    //Since filter in TgReact Table we don't need this anymore
   // state = state || this.tableState;
    //Develop branch test............
    //COmment added new one
    let Fetch = () => {

        console.log(state);

        this.setState({ loading: true, selected: null });
       // this.tableState = state;
        let filter = {};
        state.filtered.forEach(
        f => {
            if(!f.value){
               return;
            }
            if(f.value.value){
                //this is selectbox
                filter[f.id] = f.value.value;
            }
            else{
                filter[f.id]= f.value?f.value:null;
            }
        }
        );

      //  filter.filter = state.filterText;
        if(this.additionalFilters){
            this.additionalFilters.forEach(c=> filter[c.id]=c.value);
        }

        api
            .post(
                this.filterUrl+`?page=${state.page}&size=${state.pageSize}&sort=id,desc`,
                { ...filter }
            )
            .then(response => {
                this.setState({
                    tableState:state,
                    list: response.data.content,
                    loading: false,
                    page: Math.ceil(response.data.totalElements / state.pageSize)
                });
            });
    };
    this.fetchTimeout = setTimeout(() => {
        Fetch();
    }, 0);
}