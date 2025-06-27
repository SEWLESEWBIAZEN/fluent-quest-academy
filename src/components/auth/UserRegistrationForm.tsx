import { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import axios from 'axios'
import { apiUrl } from '@/lib/envService'
import { UserRole } from '@/lib/types'
import { Navigate } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'

const UserRegistrationForm = ({ user }: { user: any }) => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.Student);
  
  if (user?.registered) {    
    toast({
      title: "Success",
      description: "Already Registred!",
      variant: "primary"
    })
    return <Navigate to= "/dashboard" replace/>
  } 

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (!user) throw new Error("User is not authenticated")
      setIsLoading(true)
      const response = await axios.post(
        `${apiUrl}/users/register`,
        {
          username,
          name,
          role: role,
          email,
          phoneNumber: phonenumber,
          // avatar, if needed
        },
        {
          headers: {
            authToken: user?.accessToken, // ✅ preferred naming
          },
        }
      );

      if (response?.status === 201) {
        user.registered = true
        toast({
          title: "🎉 Success",
          description: response?.data?.message || "User Registration Complete",
          variant: "primary"
        });
        setIsLoading(false)
        return;
      }

      if (user?.email === email) {
        toast({
          title: "Error",
          description: "Use the same as sign up email.",
          variant: "destructive"
        })

      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || error.message || "Unknown error",
        variant: "destructive",
      });
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 lg:gap-4  sm:gap-2 mt-6'>
        <div className="space-y-2">
          <Label htmlFor="username">User Name</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={user?.email?.split("@")[0]}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Confirm Email Address</Label>
          <Input
            id="email"
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user?.email}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phonenumber">Phone Number</Label>
          <Input
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="0911234567"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile Picture</Label>
          <Input
            type="file"
            accept="image/*" // Correct MIME type
            id="avatar"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setAvatar(file)
              }
            }}
          />
        </div>

      </div>
      <div className="space-y-2 my-6 text-xl ">
        <Label>I am registering as a:</Label>
        <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" />
            <Label htmlFor="student" className="cursor-pointer">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teacher" id="teacher" />
            <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
          </div>
        </RadioGroup>
      </div>
      <div className='flex justify-end gap-2 items-center'>
        <Button variant='outline'>
          Cancel
        </Button>
        <Button type="submit" className="" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  )
}

export default UserRegistrationForm
