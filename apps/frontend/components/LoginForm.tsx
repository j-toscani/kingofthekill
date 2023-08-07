import { cookies } from 'next/dist/client/components/headers';
import { FC } from 'react';
import { redirect } from 'next/navigation';

const LoginForm: FC = () => {
	const token = cookies().get('auth');
	if (token) {
		redirect('http://localhost:3000/play');
	}
	async function submit(data: FormData) {
		'use server';

		if (data.get('password') && data.get('email')) {
			cookies().set('auth', 'token');
			redirect('http://localhost:3000/play');
		}
	}
	return (
		<form className="p-4 m-auto flex gap-2 flex-col" action={submit}>
			<label className="block" htmlFor="email">
				E-Mail
			</label>
			<input type="email" name="email" id="email" />

			<label className="block" htmlFor="password">
				Passwort
			</label>
			<input type="password" name="password" id="password" />

			<button type="submit">Submit</button>
		</form>
	);
};

export default LoginForm;
