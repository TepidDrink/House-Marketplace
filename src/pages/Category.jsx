import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ListingItem from "../components/ListingItem"
import Spinner from "../components/Spinner"
import { db } from "../firebase.config"

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')

        const _query = query(listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10))
        const querySnap = await getDocs(_query)

        let listings = []
        querySnap.forEach((doc) =>
          listings.push({ id: doc.id, data: doc.data() }))
        setListings(listings)
        setLoading(false)
      } catch (err) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [params.categoryName])

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          { params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale' }
        </p>
      </header>

      { loading ? (
        <Spinner/>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              { listings.map((listing) => (
                <ListingItem
                  listing={ listing.data }
                  id={ listing.id }
                  key={ listing.id }
                />
              )) }
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for { params.categoryName }</p>
      ) }
    </div>
  )
}

export default Category
