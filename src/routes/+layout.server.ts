export const load:any = async ({ cookies }:any) => {
  return {
    user: cookies.get('user') ? JSON.parse(cookies.get('user')) : false
  };
}
