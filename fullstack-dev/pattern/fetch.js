
/*
  รูปแบบการใช้ fech ฝั่ง Frontend เพื่อเรียก REST API
  เป็นแบบมาตรฐานใชักับ JavaScript Framework อื่นๆได้
  เอาค่าใน users ไปสร้าง List ของยูสเซอร์หลังได้ค่าแล้ว
  เนื่องจากใช้ JSDoc ของ SvelteKit ตรวจสอบค่าจะมี @type
  และ users ต้องใส่ค่าให้ไม่ว่าง framework อื่นใช้เป็น
  let users = [] 
*/
	/** @type [{id:number,name:string,email:string}] */
	let users = [{ id: 0, email: 'loading...', name: 'loading...' }];
	let name = '', email = '', id = 0, msg = '';
	async function getUsers() {
		const res = await fetch('/api/users');
		users = await res.json();
		msg = '';
		id = 0;
	}
	async function createUser() {
		const res = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ email, name })
		});
		if (res.status != 201) {
			msg = 'create user fail';
			return;
		}
		getUsers();
	}
	async function updateUser() {
		const res = await fetch('/api/users/' + id, {
			method: 'PUT',
			body: JSON.stringify({ email, name })
		});
		if (res.status != 200) {
			msg = 'update user fail';
			return;
		}
		getUsers();
	}
	async function deleteUser() {
		const res = await fetch('/api/users/' + id, { method: 'DELETE' });
		if (res.status != 200) {
			msg = 'delete user fail';
			return;
		}
		getUsers();
	}
