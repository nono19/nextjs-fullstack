'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from '@/app/validationSchema';
import { z } from "zod";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// interface IssueForm {
//   title: string
//   description: string
// }

type IssueForm = z.infer<typeof createIssuesSchema>

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  return (
    <div className='max-w-xl '>
      {
        error && (
          <Callout.Root color='red' className='mb-5'>
            <Callout.Text>
              {error}
            </Callout.Text>
          </Callout.Root>
        )
      }
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setSubmitting(false)
            setError('an unexpected error occured')
          }
        })}
        >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{ errors.title?.message }</ErrorMessage>
        <Controller 
          name='description'
          control={control}
          render={ ( {field} ) => <SimpleMDE placeholder='Description' { ...field } /> }
        />
        <ErrorMessage>{ errors.description?.message }</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue { isSubmitting && <Spinner /> }</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
