import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface MainProps {
	sex:any
}

const MainPage = ({sex}:MainProps) => {
	
	const sexToRus = {male:"Мужчинам",
										female:"Женщинам",
										kids:"Детям",}

	const [categories, setCategories] = useState({})

	useEffect(() => {
		axios.get("https://online-store-45134-default-rtdb.firebaseio.com/categories/"+sex+".json")
		.then(categories => setCategories(categories.data))
	}, [])

	return (
		<div className='container d-flex flex-row'>
			<div className='d-flex flex-column m-3 w-25'>
				{Object.keys(categories).length !== 0
					? (Object.keys(categories).reverse().map((category:string) => (
							<ul className="list-group m-2" key={category}>
								<li className="list-group-item list-group-item-primary">{category}</li>
								{Object.keys(categories[category as keyof typeof categories]).map((subCategory) => (
									<li className="list-group-item list-group-item-action" key={sex+subCategory}><Link className="text-decoration-none text-reset"to={"/"+sex+"/"+subCategory}>{categories[category as keyof typeof categories][subCategory]}</Link></li>
								))}
							</ul>
						)))
					: <></>
				}
			</div>
			<div className='d-flex flex-column m-3 w-75'>
				<h1>{sexToRus[sex as keyof typeof sexToRus]}</h1>
				<p>{"this is main page for "+sex }</p>
				<p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
			</div>
		</div>
	);
}
 
export default MainPage;