
export type RequestHeaders = Record<string, string>;


export interface RequestHeadersWithCourseId extends RequestHeaders {
    courseId: string;
}

export interface RequestHeadersWithLessonId extends RequestHeaders {
    lessonId: string;
}

export interface RequestHeadersWithContentId extends RequestHeaders {
    contentId: string;
}

export interface RequestHeadersWithInstructorId extends RequestHeaders {
    instructorId: string;
}

export interface RequestHeadersWithUserId extends RequestHeaders {
    userId: string;
}