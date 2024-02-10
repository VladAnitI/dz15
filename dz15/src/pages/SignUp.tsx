import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './LoginSignup.module.css';

const SignUp = () => {
	const [action, setAction] = useState('signup');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [messageEmail, setMessageEmail] = useState('');
	const [messagePassword, setMessagePassword] = useState('');

	const inputPaswordRef = useRef<HTMLInputElement | null>(null);
	const inputEmailRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const validatePassword = (password: string) => {
		const regEx =
			/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+|~\-=`{}[\]:";'<>?,.\/])[a-zA-Z0-9!@#$%^&*()_+|~\-=`{}[\]:";'<>?,.\/]{8,}$/;
		if (regEx.test(password)) {
			setMessagePassword('');
		} else if (!regEx.test(password) && password !== '' && inputPaswordRef.current && inputEmailRef.current) {
			setMessagePassword('* Password is not valid');
			inputEmailRef.current.focus();
			inputPaswordRef.current.focus();
		}
	};

	const validationEmail = (email: string) => {
		const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (regEx.test(email)) {
			setMessageEmail('');
		} else if (!regEx.test(email) && email !== '' && inputPaswordRef.current && inputEmailRef.current) {
			setMessageEmail('* Email is not valid');
			inputPaswordRef.current.focus();
			inputEmailRef.current.focus();
		}
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setPassword(value);
		validatePassword(value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setEmail(value);
		validationEmail(value);
	};

	const handleRegistration = async () => {
		setEmail('');
		setPassword('');
		setMessageEmail('');
		setMessagePassword('');
		navigate('/signup');
	};

	return (
		<>
			<div className={cn(styles['headerLog'])}>
				<div className={cn(styles['text'])}>
					{action === 'signup' ? 'Sign Up' : 'Login'}
				</div>
				<div className={cn(styles['underline'])}></div>
			</div>
			<div className={cn(styles['container'])}>
				<div className={cn(styles['inputs'])}>
					<div className={cn(styles['input'])}>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={handleEmailChange}
							ref={inputEmailRef}
						/>
						<div className={cn(styles['NotValidM'])}>{messageEmail}</div>
					</div>
					<div className={cn(styles['input'])}>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
							ref={inputPaswordRef}
						/>
						<div className={cn(styles['NotValidP'])}>{messagePassword}</div>
					</div>
				</div>
				<div className={cn(styles['submit-container'])}>
					<button
						type="button"
						className={
							action === 'signup'
								? cn(styles['submit'], styles['gray'])
								: cn(styles['submit'])
						}
						onClick={() => {
							setAction('login');
							navigate('/login');
						}}
					>
						Login
					</button>
					<button
						type="button"
						className={
							action === 'login'
								? cn(styles['submit'], styles['gray'])
								: cn(styles['submit'])
						}
						onClick={() => {
							setAction('signup');
							handleRegistration();
							navigate('/signup');
						}}
					>
						Sign Up
					</button>
				</div>
			</div>
		</>
	);
};

export default SignUp;
