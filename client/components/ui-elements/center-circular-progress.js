import React from 'react'
import ReactDOM from 'react-dom';

const style = props => ({
    backdrop: {
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: 'rgba(0,0,0,0.1',
        zIndex: '2000',
    },
    lds: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: '1001',
        display: 'block',
        width: `${props.size || 46}px`,
        height: `${props.size || 46}px`,
        border: `${props.borderSize || 6}px solid #fff`,
        borderRadius: `50%`,
        borderColor: `${props.color || '#3498db'} transparent ${props.color || '#3498db'} transparent`,
        animation: `lds-dual-ring 1.2s linear infinite`,
    }
});


let root = document.getElementById('root');

export default class CenterCircularProgress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: !props.delay
        };

        this.delay = null
    }


    componentWillUnmount() {
        clearTimeout(this.delay)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.delay){
            if(nextProps.show && !this.props.show){
                this.delay = setTimeout(() => {
                    this.setState({show: true})
                }, this.props.delay)
            }
            if(!nextProps.show && this.props.show){
                if(this.delay) clearTimeout(this.delay);
                this.setState({show: false})
            }
        }
    }

    render() {

        if (!this.props.show || !this.state.show) return null;

        if (this.props.portal) {
            return (
                ReactDOM.createPortal(
                    <div>
                        <div style={style(this.props).backdrop}/>
                        <div style={style(this.props).lds}/>
                    </div>,
                    root
                )
            )

        } else {
            return (
                <div style={style(this.props).lds}/>
            )
        }

    }
}