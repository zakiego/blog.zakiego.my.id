import Link from '@/components/Link'
// import Tag from '@/components/Tag'
import { ComponentProps, useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'
import Image from 'next/image'
import ImageTransition from '@/components/ImageTransition'
interface Props {
  posts: PostFrontMatter[]
  title: string
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  const imgLink =
    'https://images.unsplash.com/photo-1600775508114-5c30cf911a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80'

  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, readingTime, image } = frontMatter
            return (
              <li key={slug} className="py-6 md:py-8 ">
                <article className="flex items-center justify-between">
                  <div className="w-7/12 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <div className="space-y-4 md:space-y-5 xl:col-span-3">
                      <div className="space-y-5 md:space-y-6">
                        <div>
                          <h2 className="font-bold md:text-2xl">
                            <a
                              href={`/post/${slug}`}
                              className="py-1 text-gray-900 dark:text-gray-100 un-effect"
                            >
                              {title}
                            </a>
                          </h2>
                        </div>
                        <div className="text-sm prose text-gray-500 md:text-base max-w-none dark:text-gray-400 line-clamp-2 md:line-clamp-3">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium ">
                        <dl>
                          <dd className="text-xs font-medium leading-6 text-gray-500 md:text-sm dark:text-gray-400">
                            <dt className="sr-only">Published on</dt>
                            <time dateTime={date}>{formatDate(date)}</time>
                            {' · '}
                            <dt className="sr-only">Reading time</dt>
                            <span>Dibaca {readingTime} menit</span>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="block w-1/12" />

                  <div className="flex-none w-4/12 aspect-w-5 lg:aspect-w-6 aspect-h-1">
                    <ImageTransition
                      src={image || imgLink}
                      quality={80}
                      layout="fill"
                      alt="Image"
                      // className="object-cover rounded-md"
                    />
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
