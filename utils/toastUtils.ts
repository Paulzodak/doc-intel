import { toast } from "sonner";
// import { apiAxios } from "@/lib/axios";

interface ToastOptions {
  description?: string;
  duration?: number;
}

class ToastLoggerClass {
  // private apiClient = apiAxios("v1");

  // private async logToast(
  //   module: string,
  //   importance: 'success' | 'info' | 'warning' | 'error' | 'critical',
  //   message: string,
  //   description?: string
  // ) {
  //   try {
  //     // Fire and forget - don't await
  //     this.apiClient.post('/diagnostics/toast-notifications', {
  //       module,
  //       importance,
  //       message,
  //       description,
  //     }).catch(err => {
  //       // Silent fail - don't break toast functionality if logging fails
  //       console.warn('Failed to log toast notification:', err);
  //     });
  //   } catch (error) {
  //     console.warn('Failed to log toast notification:', error);
  //   }
  // }

  success(module: string, message: string, options?: ToastOptions) {
    // this.logToast(module, 'success', message, options?.description);
    return toast.success(message, {
      description: options?.description,
      duration: options?.duration || 1500,
    });
  }

  info(module: string, message: string, options?: ToastOptions) {
    // this.logToast(module, 'info', message, options?.description);
    return toast.info(message, {
      description: options?.description,
      duration: options?.duration || 3000,
    });
  }

  warning(module: string, message: string, options?: ToastOptions) {
    // this.logToast(module, 'warning', message, options?.description);
    return toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
    });
  }

  error(module: string, message: string, options?: ToastOptions) {
    console.error(`[${module}] ${message}`, options?.description || "");
    // this.logToast(module, 'error', message, options?.description);
    return toast.error(message, {
      description: options?.description,
      duration: options?.duration || 7000,
      position: "top-center",
    });
  }

  critical(module: string, message: string, options?: ToastOptions) {
    console.error(`[${module}] CRITICAL: ${message}`, options?.description || "");
    // this.logToast(module, 'critical', message, options?.description);
    return toast.error(message, {
      description: options?.description,
      duration: Infinity, // Persistent - requires manual dismissal
    });
  }
}

export const ToastLogger = new ToastLoggerClass();
