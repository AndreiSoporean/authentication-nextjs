import { MutableRefObject, useRef } from "react"
import { CreateUser } from "../../models/users";
import styles from "./AuthForm.module.css"

const createUser = async (formData: CreateUser) => {
  const result = await fetch('/api/auth/signup', {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await result.json();
  console.log({ data })

  if (!result.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

const SignupForm: React.FC = () => {
  const username = useRef() as MutableRefObject<HTMLInputElement>;
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const handleSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value
    }

    try {
      const result = await createUser(formData);
    } catch (error) {
      console.log(error)
    }
  }

  console.log('aaa ', email.current && email.current.value)
  const enableButton = email.current && email.current.value;

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <div className={styles.labelAndInput}>
        <label className={styles.inputLabel}>Name:</label>
        <input className={styles.textfield} type="text" required ref={username} />
      </div>
      <div className={styles.labelAndInput}>
        <label className={styles.inputLabel}>Email:</label>
        <input className={styles.textfield} type="text" required ref={email} />
      </div>
      <div className={styles.labelAndInput}>
        <label className={styles.inputLabel}>Password:</label>
        <input className={styles.textfield} type="password" required ref={password} />
      </div>
      <button className={styles.submitBtn} type="submit">Create Account</button>
    </form >
  )
}

export default SignupForm;
