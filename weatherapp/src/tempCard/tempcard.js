import './tempcard.css'
function TempDetail({ cityTemp, unit }) {
    return (
        <div className="card">
            <div className="card-header">
                <p>Temperature</p>
            </div>
            <br />
            <div className="card-body">
                <div className="tempContainer">
                    <div className="temp">
                        {cityTemp}
                    </div>
                    <div className="temp-unit">
                        {unit}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TempDetail; 