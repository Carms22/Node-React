function Input({type="text", label, placeholder, name, id,value, error, onChange, onBlur}) {

    return ( 
      <div className="max-w-md p-5 rounded-md ">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
  
        <input className={`form-control ${error ? 'is-invalid' : ''} w-full py-2 rounded-md bg-slate-400`} 
          name={name} id={id} type={type}
          placeholder={placeholder} value={value}
          onChange={onChange} onBlur={onBlur}
        />
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        ) }
      </div>
     );
  }
  
  export default Input;