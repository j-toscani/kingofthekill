import { FC } from 'react';
"use client"
const LoginForm: FC = () => {
    function handleSubmit(e: any) {
        e.preventDefault()
        console.log(e)
    }
	
	return (
		<form className="p-4 m-auto flex gap-2 flex-col" onSubmit={handleSubmit}>
			<div>
				<label className='block' htmlFor="email">E-Mail</label>
				<input type="email" name="email" id="email"/>
			</div>
			<div>
				<label className='block' htmlFor="password"> Passwort </label>
				<input type="password" name="password" id="password" />
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default LoginForm;
