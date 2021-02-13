import config from '../res/config.json';

export const sendFile = (file: File, key: string,
	flags: OptionState, progressFunc: (args: any) => void) => {

	const formData = new FormData();
	formData.append("file", file);
	formData.set("protected", flags.protected.toString());

	const request = new XMLHttpRequest();
	request.open('post', `${config.server}/f`);
	request.setRequestHeader('Authorization', `Bearer ${key}`);
	
	const initiated = new Date().getTime();
	const reqData = new Promise<any>(async (resolve) => {
		request.upload.addEventListener('progress', (progress) => {
			if(file) {
				progressFunc({progress, file, initiated});
			} else {
				resolve({
					filename: "file read error",
					file_id: initiated,
					inProgress: false,
					progress: -1,
					initiated,
				});
			}
		});
		
		request.addEventListener('load', async (_event) => {
			try {
				resolve({
					...JSON.parse(request.responseText),
					inProgress: false,
					progress: 100,
					initiated,
				});
			} catch {
				resolve({
					filename: file.name,
					file_id: initiated,
					inProgress: false,
					progress: -1,
					initiated,
				});
			}
		});		
		
		request.addEventListener('error', async () => {
			if(file) {
				resolve({
					filename: file.name,
					file_id: initiated,
					inProgress: false,
					progress: -1,
					initiated,
				});
			} else {
				resolve({
					filename: "file read error",
					file_id: initiated,
					inProgress: false,
					progress: -1,
					initiated,
				});
			}
		});
	});

	request.send(formData);
	
	return reqData;
};