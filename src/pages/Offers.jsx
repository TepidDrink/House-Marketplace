import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')

        const _query = query(listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10))
        const querySnap = await getDocs(_query)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

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

  const onFetchMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings')

      const _query = query(listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10))
      const querySnap = await getDocs(_query)

      let listings = []
      querySnap.forEach((doc) =>
        listings.push({ id: doc.id, data: doc.data() }))
      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (err) {
      toast.error('Could not fetch listings')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          Offers
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

          <br/>
          <br/>
          { lastFetchedListing && (
            <p className='loadMore' onClick={ onFetchMoreListings }>
              Load More
            </p>
          ) }
        </>
      ) : (
        <p>There are no current offers</p>
      ) }
    </div>
  )
}

export default Offers
