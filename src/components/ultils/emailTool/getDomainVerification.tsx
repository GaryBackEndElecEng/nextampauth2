type domaineResType={
    valid:boolean,
    block:boolean,
    disposable:boolean,
    domain:string,
    text:string,
    reason:string,
    risk:8
    mx_host:string,
    possible_typo:string[],
    mx_ip:string,
    mx_info:string,
    last_changed_at:string
}
 const getDomainVerification=async(domain:string | undefined):Promise<any | undefined>=>{
const url = `https://mailcheck.p.rapidapi.com/?domain=${domain}`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '512e19eb3cmsh0b9bf8c65edd50ep11ae4bjsn9a01883aacf8',
    'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
  }
};
try {
	const response = await fetch(url, options);
	const result = await response.text();
	const body:domaineResType= JSON.parse(result);
    console.log(body);
    return body;
} catch (error) {
    if(error){
	console.error(error);
    }else{
        console.error(new Error("was not recieved"))
    }
}
}
export default getDomainVerification;