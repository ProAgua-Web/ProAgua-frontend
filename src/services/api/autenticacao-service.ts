const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CredenciaisDTO {
  username: string;
  password: string;
}

export interface CSRF {
  csrftoken: string;
}

export async function getCSRFToken(): Promise<string> {
  const resp = await fetch(API_BASE_URL + '/api/v1/csrf', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await resp.json();

  return data['csrftoken'];
}

export async function entrar(data: CredenciaisDTO) {
  try {
    const csrfToken = await getCSRFToken();
    localStorage.setItem('csrftoken', csrfToken);

    const response = await fetch(API_BASE_URL + '/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.status != 200 || responseData == null) {
      alert(`Erro ao fazer login!`);
    } else {
      alert('Login efetuado com sucesso!');

      let token = responseData.access_token;
      localStorage.setItem('token', token);
      window.location.href = '/admin/pontos';
    }
  } catch (err) {
    alert('Houve um erro durante a autenticação');
  }
}
