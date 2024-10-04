const AddForm = ({name,number, onNameChange, onPhoneChange, onSubmit}) => {
    return(
      <form onSubmit={onSubmit}>
        <h2>Add a New</h2>
        <div>
          name: <input name={'name'} value={name} onChange={onNameChange}/>
        </div>
        <div>
          phone: <input value={number} onChange={onPhoneChange}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>
    )
  };

export default AddForm