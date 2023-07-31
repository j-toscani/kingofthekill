import { User } from '../../types';
import { UnauthorizedError } from '../errors/ApiErrors';

enum Rule {
	CREATE_ROOM,
	EDIT_ROOM,
}

type RuleSet = Rule[];

export function authenticate(_rules: RuleSet = []): (user: User) => User {
return (user) => {
		if (typeof user !== 'string') throw new UnauthorizedError('No user found');
		// add ruleset check here
		return user;
	};
}
