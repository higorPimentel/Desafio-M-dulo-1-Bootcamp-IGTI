
btn = document.querySelector('#btn_pesquisa')
cx_user = document.querySelector('#cx_pesquisa')
btn.addEventListener('click', funcao_filtro_btn)
btn.addEventListener('mousemove', foco_btn)
btn.addEventListener('mouseout', ret_btn)
cx_user.addEventListener('keyup', funcao_filtro)
tabela = document.querySelector('.table-registros')
titulo_table = document.querySelector('#titulo-table') 
value_masc = document.querySelector('#value_masculino')
value_fem = document.querySelector('#value_feminino')
value_soma_idade = document.querySelector('#soma_idade')
value_media_idade = document.querySelector('#media_idade')

users = []


window.addEventListener('load',start)


async function start(){
await acessa_api();

}



async function acessa_api(){

	let resp = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
	let json = await resp.json();

//	console.log(users)
	
		users = json.results.map(function(novo_item){
				return{
					nome:`${novo_item.name.first} ${novo_item.name.last}`.toUpperCase(),
					foto_perfil:`${novo_item.picture.large}`,
					idade:`${novo_item.dob.age}`,
					genero:`${novo_item.gender}`

				}

		})

}

function foco_btn(){
	btn.style.backgroundColor = 'rgba(0,0,0,0)';
}

function ret_btn(){
	btn.style.backgroundColor = 'rgba(0,0,0,0.5)';
}


function funcao_filtro_btn(event){

	if (event.target.value === '') {
					identifica_value = 0					
		} else {
			identifica_value = 1					
		}

		inicia_filtro()	
}


function funcao_filtro(event){

		if (event.key === 'Enter'){
			identifica_value = 1
			inicia_filtro()	
		}

		if (event.key === 'Backspace'){
				if (event.target.value === '') {
					identifica_value = 0
					inicia_filtro()	
				}
		}
		

//Backspace
	console.log(event.key)

}

function inicia_filtro(){



console.log('ok')
	const dados_filtrados =  users.filter(function(item_retornado){
		return item_retornado.nome.includes(cx_user.value.toUpperCase())
	})

	

	if ( dados_filtrados.length === 0 || identifica_value === 0 ) {
		titulo_table.innerHTML = 'Nenhum usuário Filtrado';
		tabela.innerHTML = '';
		value_masc.innerHTML = 0
		value_fem.innerHTML = 0
		value_soma_idade.innerHTML = 0
		value_media_idade.innerHTML =	0

		return;	
	}


		if (cx_user.value === '') {
			alert('cx_vazia')
			return;
		}

			
			let itm =''
			let user_male = 0
			let user_female =0
			let tot_age = 0
			let avg_age = 0

			for (var i = 0 ; i < dados_filtrados.length; i++) {
							

					
						itm +='<tr>'
						itm += '<th><img class="img-registros" src="' + dados_filtrados[i].foto_perfil + '"></th>'
						itm += '<th>' + dados_filtrados[i].nome +',</th>'
						itm += '<th>' + dados_filtrados[i].idade + ' Anos</th>'
						itm += '</tr>'
						tabela.innerHTML = itm
						

									if (dados_filtrados[i].genero === 'female') {
										user_female += 1	
									} else {
										user_male += 1
									}


									tot_age += parseInt(dados_filtrados[i].idade)
								


			}

			
			avg_age  = parseInt(tot_age) / parseInt(dados_filtrados.length)
			titulo_table.innerHTML = dados_filtrados.length + ' Usuário(s) Encontrado(s)'
			value_masc.innerHTML = user_male
			value_fem.innerHTML = user_female
			value_soma_idade.innerHTML = tot_age
			value_media_idade.innerHTML =	Math.round(avg_age,3)

}


