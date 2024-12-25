import { ReactNode } from 'react';

import AlertCircle from './icons/AlertCircle';
import AlternateShare from './icons/AlternateShare';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import Bookmark from './icons/Bookmark';
import Check from './icons/Check';
import CheckCircle from './icons/CheckCircle';
import CheckCircleFilled from './icons/CheckCircleFilled';
import ChevronDoubleLeft from './icons/ChevronDoubleLeft';
import ChevronDoubleRight from './icons/ChevronDoubleRight';
import ChevronDown from './icons/ChevronDown';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import ChevronUp from './icons/ChevronUp';
import Close from './icons/Close';
import CloseCircleFilled from './icons/CloseCircleFilled';
import Controller from './icons/Controller';
import DisabledBookmark from './icons/DisabledBookmark';
import Dropdown from './icons/Dropdown';
import Dropup from './icons/Dropup';
import EditNotePencil from './icons/EditNotePencil';
import EditPencil from './icons/EditPencil';
import ExternalLink from './icons/ExternalLink';
import Eye from './icons/Eye';
import EyeOff from './icons/EyeOff';
import Heart from './icons/Heart';
import HeartFilled from './icons/HeartFilled';
import Image from './icons/Image';
import Lock from './icons/Lock';
import Menu from './icons/Menu';
import Message from './icons/Message';
import MoreHorizontal from './icons/MoreHorizontal';
import Notification from './icons/Notification';
import Pause from './icons/Pause';
import Person from './icons/Person';
import Plus from './icons/Plus';
import Search from './icons/Search';
import Star from './icons/Star';
import Unlock from './icons/Unlock';
import UploadShare from './icons/UploadShare';

export const iconsNames: Record<
  string,
  ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => ReactNode
> = {
  AlertCircle,
  AlternateShare,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle,
  CheckCircleFilled,
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  CloseCircleFilled,
  Controller,
  DisabledBookmark,
  EditNotePencil,
  EditPencil,
  ExternalLink,
  Eye,
  EyeOff,
  Heart,
  HeartFilled,
  Image,
  Menu,
  Message,
  MoreHorizontal,
  Notification,
  Pause,
  Person,
  Plus,
  Search,
  Star,
  UploadShare,
  Dropup,
  Dropdown,
  Lock,
  Unlock,
};
