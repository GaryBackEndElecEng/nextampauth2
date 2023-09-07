import {nextCsrf} from "next-csrf";

const getCSRF=process.env.CSRF_SECRET;
const { csrf,setup} = nextCsrf({
    //eslint-disable-next-line no-undef
    secret:getCSRF
});
export {csrf,setup}