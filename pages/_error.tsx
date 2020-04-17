import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import DefaultLayout from '../components/layouts/default.layout';

import { parseCookies } from 'nookies';
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle,
	FaUserCircle } from 'react-icons/fa';

import { RootAction, ActionGroup,
	UploadHistoryAction } from '../store/_store.types';
import config from '../config.json';

const Page: NextPage<RootState> = () => {

	const authorization
		= useSelector((state: RootState) => state.authorization);

	const authLink: {
		href: string,
		icon: JSX.Element,
	} = {
		href: "/",
		icon: <FaSignOutAlt />,
	};
	
	const links: {
		key: number,
		href: string,
		icon: JSX.Element,
	}[] = [{
		key: 0,
		href: "/",
		icon: <FaArrowAltCircleUp />,
	},{
		key: 1,
		href: "/faq",
		icon: <FaQuestionCircle />,
	},{
		key: 2,
		href: "/dashboard",
		icon: <FaUserCircle />,
	}];
	
	const headProps = {
		title: config.title,
		description: config.description,
		url: config.url,
		ogTitle: config.title,
		ogDescription: config.description,
		ogUrl: config.url,
		ogSiteName: config.og.site,
		twSite: config.tw.site,
	}

	return (
		<DefaultLayout
		authLink={authLink} links={links}
		authorization={authorization} headProps={headProps}>

			<h1> OOF: Page not found! </h1>
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = (ctx) => {

	const rootState: RootState = ctx.store.getState();
	const initialProps: RootState = rootState;

	return initialProps;
};

export default Page;