import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { SavedList, GuestCounts, ShoppingItem } from '../types'
import type { User } from 'firebase/auth'

function generateShareId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < 12; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

function toDate(val: Timestamp | Date | undefined): Date {
  if (!val) return new Date()
  if (val instanceof Date) return val
  return val.toDate()
}

export function useFirestore(user: User | null) {
  const [savedLists, setSavedLists] = useState<SavedList[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const fetchLists = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const q = query(
        collection(db, 'lists', user.uid, 'savedLists'),
        orderBy('updatedAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const lists = snapshot.docs.map((docSnap) => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          name: data.name,
          guestCounts: data.guestCounts,
          items: data.items,
          shareId: data.shareId,
          createdAt: toDate(data.createdAt),
          updatedAt: toDate(data.updatedAt),
        } as SavedList
      })
      setSavedLists(lists)
    } catch {
      setError('errorGeneric')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchLists()
  }, [fetchLists])

  const saveList = async (
    name: string,
    guestCounts: GuestCounts,
    items: ShoppingItem[],
    existingId?: string
  ): Promise<string | null> => {
    if (!user) return null
    setLoading(true)
    setError(null)
    try {
      const now = serverTimestamp()
      const savedAt = new Date()
      let docId: string
      let shareId: string

      if (existingId) {
        // Overwrite existing — preserve shareId and createdAt
        const existing = savedLists.find((l) => l.id === existingId)
        shareId = existing?.shareId ?? generateShareId()
        docId = existingId
        await updateDoc(doc(db, 'lists', user.uid, 'savedLists', existingId), {
          name,
          guestCounts,
          items,
          shareId,
          updatedAt: now,
        })
        setSavedLists((prev) =>
          prev.map((l) =>
            l.id === existingId ? { ...l, name, guestCounts, items, updatedAt: savedAt } : l
          )
        )
      } else {
        shareId = generateShareId()
        const docRef = await addDoc(collection(db, 'lists', user.uid, 'savedLists'), {
          name,
          guestCounts,
          items,
          shareId,
          createdAt: now,
          updatedAt: now,
        })
        docId = docRef.id
        setSavedLists((prev) => [
          { id: docId, name, guestCounts, items, shareId, createdAt: savedAt, updatedAt: savedAt },
          ...prev,
        ])
      }

      // Update public share snapshot
      await setDoc(doc(db, 'publicShares', shareId), {
        listId: docId,
        userId: user.uid,
        listName: name,
        guestCounts,
        items,
        sharedByName: user.displayName ?? 'Anonymous',
        createdAt: now,
      })

      showToast('listSaved')
      return shareId
    } catch {
      setError('listSaveFailed')
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteList = async (listId: string) => {
    if (!user) return
    try {
      await deleteDoc(doc(db, 'lists', user.uid, 'savedLists', listId))
      await fetchLists()
    } catch {
      setError('errorGeneric')
    }
  }

  return { savedLists, loading, error, toast, saveList, deleteList, fetchLists }
}

export async function getPublicShare(shareId: string) {
  try {
    const docSnap = await getDoc(doc(db, 'publicShares', shareId))
    if (!docSnap.exists()) return null
    const data = docSnap.data()
    return {
      shareId,
      listId: data.listId,
      userId: data.userId,
      listName: data.listName,
      guestCounts: data.guestCounts,
      items: data.items,
      sharedByName: data.sharedByName,
      createdAt: toDate(data.createdAt),
    }
  } catch {
    return null
  }
}
