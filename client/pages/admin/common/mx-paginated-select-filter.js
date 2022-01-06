/**
 * Created by Administrator on 4/15/2019.
 */

import React from "react";
import api from '../../../api'
import AsyncSelect from "react-select/lib/Async";


export default class MXPaginatedSelectFilter extends React.Component {

    constructor(props) {
        super(props);

        this.timeout = false;
        this.inputValue='';
        this.callback = null;
        this.options = [];
        this.paginate = {
            page: 0,
            totalPages: 0
        };
        this.stopLoadMore = false;
    }


    getRequestQueryParams(){
        const query = this.props.query || {};
        query.page = this.paginate.page;
        query.size = this.props.pageSize||10;
        let esc = encodeURIComponent;
        return Object.keys(query).map(k => esc(k) + '=' + esc(query[k])).join('&');
    }


    loadMore(e) {
        const target = e.target;
        if (this.paginate.totalPages <= this.paginate.page + 1 || this.stopLoadMore) return;
        this.paginate.page += 1;

        this.stopLoadMore = true;
        api.post(`${this.props.filterUrl}?${this.getRequestQueryParams()}`, {
                ...this.props.filters,
                filter: this.inputValue,
                active: 'YES'
            }
        ).then(response => {
            this.options = this.options.concat(response.data.content.map(c => ({value: c.id, label: c.description})));
            this.callback(this.options);
            this.stopLoadMore = false;
            let event = new WheelEvent('wheel', {deltaY: 1 });
            target.parentElement.dispatchEvent(event);
        });
    }



    loadOptions(inputValue, callback) {
        //set callback for pagination
        if (!this.callback) this.callback = callback;
        //reset pagination and options when filter changed
        this.options = [];
        this.paginate = {
            page: 0,
            totalPages: 0
        };

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            api.post(`${this.props.filterUrl}?${this.getRequestQueryParams()}`, {
                    ...this.props.filters,
                    filter: inputValue || '',
                    active: 'YES'
                }
            ).then(response => {
                this.paginate.totalPages = response.data.totalPages;
                this.options = response.data.content.map(c => ({value: c.id, label: c.description}));
                this.inputValue=inputValue;
                callback(this.options)
            });
        }, 300)
    }

    render() {
        const {value, onChange, ...props} = this.props;

        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder={this.props.placeholder}
                isClearable={true}
                loadOptions={this.loadOptions.bind(this)}
                menuPortalTarget={document.getElementById('portal-target')}
                onChange={value => {console.log('on Change '); onChange(value ? value : null)}}
                value={value}
                onMenuScrollToBottom={this.loadMore.bind(this)}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        boxShadow: "none"
                        // You can also use state.isFocused to conditionally style based on the focus state
                    }),
                    menuPortal: styles => ({ ...styles, zIndex: 1052 }),
                    menuList: styles => {
                        return {
                            ...styles,
                            maxHeight: `300px`
                        }
                    }
                }}
                {...props}
            />
        );
    }
}

//${(this.props.pageSize * 30 > 300 ? 300: this.props.pageSize * 30)}
