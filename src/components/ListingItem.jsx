import React from 'react'
import TimeAgo from 'timeago-react';
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

function ListingItem({ listing, id, handleDelete, handleEdit }) {
	const navigate = useNavigate();

	return (
		<div className="w-full mb-10 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-150 overflow-hidden flex flex-col justify-between bg-slate-50 ">
			{/* top */}
			<div
				onClick={() => navigate(`/category/${listing?.type}/${id}`)}
				className="relative cursor-pointer">
				<img
					src={listing?.images[0]}
					alt="listing_img"
					className="w-full h-[170px] cursor-pointer object-cover hover:scale-105 transition-scale duration-200 ease-in "
				/>

				<p className="text-md absolute top-2 left-2 font-semibold bg-blue-500 w-42 py-1 px-2 text-center rounded-md text-white uppercase">
					<TimeAgo datetime={listing?.timestamp.toDate()} />
				</p>
			</div>

			{/* bottom */}
			<div className=" flex flex-col items-start space-y-5 px-5" >
				<div className="flex items-center pt-4 w-full">
					<div>
						<MdLocationOn className="text-green-600 h-6 w-6" />
					</div>
					<p className="text-gray-500 uppercase font-semibold whitespace-nowrap truncate ml-1">
						{listing?.address.toString()}
					</p>
				</div>

				<p className="text-xl font-bold truncate w-[80%]">{listing?.name}</p>

				<p className="text-lg font-semibold text-[#457b9d]">
					${" "}
					{listing.offer
						? listing.discountPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						: listing.regularPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
					{listing?.type === "rent" && " / Month"}
				</p>

				<div className="flex items-center w-full text-md pb-3">
					{/* bed and bath */}
					<div className="space-x-2 flex-grow">
						{/* bed */}
						<span className="text-sm font-semibold">
							{listing?.beds > 1 ? `${listing?.beds} Beds` : "1 Bed"}
						</span>

						{/* bath */}
						<span className="text-sm font-semibold">
							{listing?.baths > 1 ? `${listing?.baths} Baths` : "1 Bath"}
						</span>
					</div>

					{/* icons */}
					<div className="flex items-center space-x-3 font-bold">
						{handleEdit && (
							<MdEdit
								onClick={() => handleEdit(id)}
								className="text-gray-700"
							/>
						)}

						{handleDelete && (
							<FaTrash
								onClick={() => handleDelete(id)}
								className="text-red-600"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingItem
