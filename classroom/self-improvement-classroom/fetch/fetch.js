
/*
  รูปแบบการใช้ fech ฝั่ง Frontend เพื่อเรียก REST API
  เป็นแบบมาตรฐานใชักับ JavaScript
*/
	let users = []
	let msg=""
	async function getUsers() {
		const res = await fetch('/api/users')
		users = await res.json()
	}
	async function createUser() {
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ email, name })
		});
		if (!res.ok) {
			msg = 'create user fail '+res.status
			return
		}
		getUsers();
	}
	async function updateUser() {
		const res = await fetch('/api/users/' + id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ email, name })
		});
		if (!res.ok) {
			msg = 'update user fail '+res.status
			return
		}
		getUsers()
	}
	async function deleteUser() {
		const res = await fetch('/api/users/' + id, { method: 'DELETE' });
		if (!res.ok) {
			msg = 'delete user fail '+res.status
			return
		}
		getUsers()
	}