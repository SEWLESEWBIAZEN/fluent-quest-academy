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
import { Course, Language, LanguageLevel } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface EditCourseProps {
    languages: Language[];
    languageLevels: LanguageLevel[];  
    course: Course;
}

const EditCourse: React.FC<EditCourseProps> = ({ languages, languageLevels, course }) => {
    const { user } = useAuth()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState(course?.title ?? '');
    const [courseCode, setCourseCode] = useState(course?.code ?? '');
    const [courseDescription, setCourseDescription] = useState(course?.description ?? '');
    const [courseLevel, setCourseLevel] = useState<string>(course?.language_level?? "select");
    const [language, setLanguage] = useState<string>(course?.language_id ?? "select");
    const [courseDuration, setCourseDuration] = useState<number>(course?.duration ?? 0);   
    const [isLoading, setIsLoading] = useState(false);  

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true);
        e.preventDefault();        
        const updateCourseData = {
            title,
            code: courseCode,
            description: courseDescription,
            language_level: courseLevel,
            language_id: language,
            duration: courseDuration            
        }

        try {
            const response = await axios.put(`${apiUrl}/courses/update/${course._id}`, updateCourseData, {
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': user?.accessToken ?? ""
                }
            })

            if (response?.data?.success) {
                toast({
                    title: "Success",
                    description: response?.data?.message ?? "Course updated successfully!",
                    variant: "primary"
                })

                setIsDialogOpen(false);
            }
            else {
                toast({
                    title: "Error Occured",
                    description: response?.data?.message ?? "Failed to update course.",
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
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild><Button variant="outline" size="sm">Edit</Button></DialogTrigger>
            <DialogContent className='max-w-[400px] md:max-w-4xl' >
                <DialogTitle className="text-lg font-semibold">Edit Course</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">Fill in the details below to edit the course.</DialogDescription>
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

                    </div>
                    <div className='mt-4 flex justify-end'>
                        <Button type="submit" disabled={isLoading}>{isLoading ? "Updating..." : "Update Course"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourse
