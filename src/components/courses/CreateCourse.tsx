import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { Language, LanguageLevel, UserData } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface CreateCourseProps{
    languages: Language[];
    languageLevels: LanguageLevel[];
    teachers: UserData[];
}

const CreateCourse: React.FC<CreateCourseProps> = ({ languages, languageLevels, teachers }) => {

    const { user } = useAuth()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseLevel, setCourseLevel] = useState<string>("select");
    const [language, setLanguage] = useState<string>("select");
    const [courseThumbnail, setCourseThumbnail] = useState<File | null>(null);
    const [courseDuration, setCourseDuration] = useState(0);
    const [courseInstructor, setCourseInstructor] = useState('select');

    const instructorId = user?.role === 'teacher' ? user?.userId : courseInstructor;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('code', courseCode);
        formData.append('description', courseDescription);
        formData.append('language_level', courseLevel);
        formData.append('language_id', language);
        formData.append('thumbnail', courseThumbnail);
        formData.append('duration', courseDuration.toString());
        formData.append('teacherId', instructorId);
        try {
            const response = await axios.post(`${apiUrl}/courses/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authToken': user?.accessToken ?? ""
                }
            })

            if (response?.data?.success) {
                toast({
                    title: "Success",
                    description: response?.data?.message ?? "Course created successfully!",
                    variant: "primary"
                })

                setIsDialogOpen(false);
            }
            else {
                toast({
                    title: "Error Occured",
                    description: response?.data?.message ?? "Failed to create course.",
                    variant: "destructive"
                })
            }
        }
        catch (error: any) {
            toast({
                title: error?.message || "Error Occured",
                description: error?.response?.data?.message || error?.message || "Failed to create course.",
                variant: "destructive"
            })
        }

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild><Button>Create New Course</Button></DialogTrigger>
            <DialogContent className='max-w-[400px] md:max-w-4xl' >
                <DialogTitle className="text-lg font-semibold">Create New Course</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">Fill in the details below to create a new course.</DialogDescription>
                <form className='flex flex-col space-y-8 p-4 rounded-md' onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex-1'>
                            <Label htmlFor="courseTitle">
                                Course Title
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="text"
                                id="courseTitle"
                                name="courseTitle"
                                placeholder='Enter course title...'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className=''>
                            <Label htmlFor="courseCode">
                                Course Code
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="text"
                                id="courseCode"
                                name="courseCode"
                                placeholder='Enter course code...'
                                required
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="courseDescription">
                            Course Description
                            <span className='text-red-500'>*</span>
                        </Label>
                        <Textarea id="courseDescription"
                            name="courseDescription"
                            placeholder='Enter course description...'
                            required
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)} />
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex-1'>
                            <Label htmlFor='language'>
                                Language
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Select name="language" required value={language} onValueChange={setLanguage}>
                                <SelectTrigger className='flex justify-end mr-2'>
                                    <SelectValue placeholder={language ?? "Select a language"} />
                                </SelectTrigger>
                                <SelectContent defaultValue={language}>
                                    <SelectItem value="select">---Select a language---</SelectItem>
                                    {languages?.map((lang) => (
                                        <SelectItem key={lang?._id} value={lang?._id}>
                                            {lang.name}-{lang?.code}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex-1'>
                            <Label htmlFor="courseLevel">
                                Course Level
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Select name="courseLevel" required value={courseLevel} onValueChange={setCourseLevel}>
                                <SelectTrigger className='flex justify-end mr-2' >
                                    <SelectValue placeholder={courseLevel ?? "Select a level"} />
                                </SelectTrigger>
                                <SelectContent defaultValue={courseLevel}>
                                    <SelectItem value="select">---Select a level---</SelectItem>
                                    {languageLevels?.map((level) => (
                                        <SelectItem key={level?._id} value={level?._id}>
                                            {level?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        {user?.role === "admin" && (
                            <div className='flex-1'>
                                <Label htmlFor='teacher'>
                                    Teacher
                                    <span className='text-red-500'>*</span>
                                </Label>
                                <Select name="teacher" required value={courseInstructor} onValueChange={setCourseInstructor}>
                                    <SelectTrigger className='flex justify-end mr-2'>
                                        <SelectValue placeholder={courseInstructor ?? "Select a teacher"} />
                                    </SelectTrigger>
                                    <SelectContent defaultValue={courseInstructor}>
                                        <SelectItem value="select">---Select a teacher---</SelectItem>
                                        {teachers?.map((teacher) => (
                                            <SelectItem key={teacher?._id} value={teacher?._id}>
                                                {teacher?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>)}
                        <div className='flex-1'>
                            <Label htmlFor='courseDuration'>
                                Duration
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="text"
                                id="courseDuration"
                                name="courseDuration"
                                placeholder='Enter course duration...'
                                required
                                value={courseDuration}
                                onChange={(e) => setCourseDuration(Number(e.target.value))} />
                        </div>
                        <div className='flex-1'>
                            <Label htmlFor="courseImage">
                                Course Thumbnail
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="file"
                                id="courseImage"
                                name="courseImage"
                                accept="image/*"
                                onChange={(e) => setCourseThumbnail(e.target.files[0])} />
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <Button type="submit" >Create Course</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCourse
