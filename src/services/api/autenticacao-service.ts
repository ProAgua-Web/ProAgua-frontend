const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CredenciaisDTO {
  username: string;
  password: string;
}

export interface CSRF {
  csrftoken: string;
}

// TODO: colocar no padrão do ApiResponse
// export async function getCSRFToken() {
//   const response = await api.get<CSRF>('/csrf');
//   return response.data;
// }

// export async function getCSRFToken(): Promise<string> {
//   const resp = await fetch(API_BASE_URL + '/csrf', {
//     method: 'GET',
//     credentials: 'include',
//   });

//   const data = await resp.json();

//   return data['csrftoken'];
// }

// export async function entrar(data: CredenciaisDTO) {
//   try {
//     const csrfToken = await getCSRFToken();
//     localStorage.setItem('proagua:csrftoken', csrfToken.csrftoken);

//     const response = await fetch(API_BASE_URL + '/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken.csrftoken,
//       },
//       credentials: 'include',
//       body: JSON.stringify(data),
//     });

//     const responseData = await response.json();

//     if (response.status != 200 || responseData == null) {
//       alert(`Erro ao fazer login!`);
//     } else {
//       alert('Login efetuado com sucesso!');

//       let token = responseData.access_token;
//       localStorage.setItem('token', token);
//       window.location.href = '/admin/pontos';
//     }
//   } catch (err) {
//     alert('Houve um erro durante a autenticação');
//   }
// }
