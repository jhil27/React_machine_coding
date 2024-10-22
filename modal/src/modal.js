
import './App.css'
const Modal = ({ }) => {
    return (
        <div className='modal-shadow'>
            <div className='modal'>
                <div className="modal-content">
                    <div className="modal-content--header">
                        Header
                    </div>
                    <br/>
                    <div className="modal-content--body">
                        body
                    </div>
                    <br/>
                    <div className="modal-content--footer">
                        footer
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;