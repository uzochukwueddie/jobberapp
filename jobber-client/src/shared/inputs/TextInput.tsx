import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { ITextInputProps } from '../shared.interface';

const TextInput: ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & RefAttributes<HTMLInputElement>> = forwardRef((props, ref) => (
  <>
    <input
      ref={ref}
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      readOnly={props.readOnly}
      checked={props.checked}
      className={props.className}
      maxLength={props.maxLength}
      style={props.style}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      autoComplete="false"
    />
  </>
));

export default TextInput;
