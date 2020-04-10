/**
 * index.ts
 * - Application homepage.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { RootAction, ActionGroup } from '../store/_types';

interface Props {
	authorization: AuthorizationState;
	history: HistoryState;
}

/** Page */
const Page: NextPage<Props> = props => {
	const rootState = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const authorization = rootState.authorization;
	const history = rootState.history;

	console.log(props);
	console.log(authorization);
	console.log(history);
	
	return (
		<div>
			Hello World!
		</div>
	);
};

/** Initial props */
Page.getInitialProps = ({ store, isServer }) => {
	if (isServer) {
		/* Do some staff */
	}

	const action: RootAction = {
		group: ActionGroup.ROOT,
	}

	store.dispatch({ type: action });

	const rootState: RootState = store.getState();
	const initialProps: Props = rootState;

	return initialProps;
};

export default Page;