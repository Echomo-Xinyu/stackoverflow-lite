export default function Input(props) {
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        required={props.required | false}
        type={props.type}
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={(event) => {
          props.onInputChange(event);
      }}/>
    </>
  )
}