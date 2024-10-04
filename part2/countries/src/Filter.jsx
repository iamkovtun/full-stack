const Filter = ({filt, onChange}) => {
    return (
        <div>
            find countries: <input value={filt} onChange={onChange}/>
        </div>
    )
}

export default Filter