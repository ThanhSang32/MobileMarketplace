
export const api = {
  async get(url: string) {
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'X-Session-ID': localStorage.getItem('sessionId') || ''
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },

  async post(url: string, data?: any) {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': localStorage.getItem('sessionId') || ''
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },

  async put(url: string, data?: any) {
    const res = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': localStorage.getItem('sessionId') || ''
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },

  async delete(url: string) {
    const res = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-Session-ID': localStorage.getItem('sessionId') || ''
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }
};
