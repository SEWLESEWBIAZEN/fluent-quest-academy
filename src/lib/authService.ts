

class AuthService {  
     public score: number = 0; // 👈 class attribute
  // Check password strength (same as before)  
  checkPasswordStrength(password: string): number {
    this.score = 0
    if (password.length >= 8) this.score++
    if (/[A-Z]/.test(password)) this.score++
    if (/[a-z]/.test(password)) this.score++
    if (/[0-9]/.test(password)) this.score++
    if (/[^A-Za-z0-9]/.test(password)) this.score++
    return Math.min(this.score, 4)
  }

  getPasswordFeedback(score: number): { text: string; color: string } {
    switch (score) {
      case 0:
        return { text: "Very weak", color: "bg-red-500" }
      case 1:
        return { text: "Weak", color: "bg-orange-500" }
      case 2:
        return { text: "Fair", color: "bg-yellow-500" }
      case 3:
        return { text: "Good", color: "bg-blue-500" }
      case 4:
        return { text: "Strong", color: "bg-green-500" }
      default:
        return { text: "Invalid", color: "bg-gray-500" }
    }
  }
}

export const authService = new AuthService()
export default authService